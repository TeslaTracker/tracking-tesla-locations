import axios from 'axios';
import { detailedDiff } from 'deep-object-diff';

import deepEqual from 'deep-equal';
import { Database } from './types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

type TeslaLocation = Database['public']['Tables']['tesla_locations']['Row'];
/**
 *
 * @param startIndex Starting index, random if not specified // still scans the 10 most recents items
 * @param length Number of items to check
 * @returns
 */
export async function getAllLocations(startIndex?: number, length?: number): Promise<{ location_id: string }[]> {
  console.log(`Retrieving all locations...`);

  const res = await axios.get('https://www.tesla.com/cua-api/tesla-locations');
  console.log(`${res.data.length} locations retrieved.`);

  // random start index if not specified
  if (!startIndex) {
    startIndex = Math.floor(Math.random() * res.data.length);
  }

  // filter items
  // substract 10  because we keep 10 slots for the recent items

  const recentItems = (res.data as any[]).splice(res.data.length - 10, 10);
  const items = (res.data as any[]).splice(startIndex, (length || 0) - 10);
  items.push(...recentItems);
  console.log(`Scanning ${items.length} locations starting at index ${startIndex}...`);
  return items;
}

/**
 * Fetch details for a specific location
 * @param location_id
 * @returns
 */
export async function getLocationDetails(location_id: string): Promise<TeslaLocation> {
  console.log(`Fetching infos for location ${location_id} ...`);
  const res = await axios.get(`https://www.tesla.com/cua-api/tesla-location?id=${location_id}`);
  return res.data;
}

/**
 * Save a location info
 * @param location
 * @param supabase
 * @param force force update
 */
export async function saveLocation(location: TeslaLocation, supabase: SupabaseClient<Database>, force?: boolean): Promise<void> {
  if (!location.location_id) {
    console.log(`Location has no location_id. Skipping...`);
    return;
  }

  console.log(`Processing location ${location.location_id} ...`);

  const existing = await supabase.from('tesla_locations').select('location_id, data').eq('location_id', location.location_id).limit(1);

  // entry exists, update it
  if (existing.data && existing.data[0]) {
    const existingLocation = existing.data[0];

    //stop if there is no difference
    if (deepEqual(existingLocation.data, location) && !force) {
      console.log(`No changes detected for location ${location.location_id} skipping ...`);
      return;
    }

    //generate a diff
    const diff = detailedDiff(existingLocation.data as object, location);

    console.log(`Updating location ${location.location_id} ${force ? ' (forced)' : ''}`);

    // update item
    await supabase
      .from('tesla_locations')
      .update({
        chargers: location.chargers,
        geocode: location.geocode,
        is_gallery: location.is_gallery,
        latitude: location.latitude,
        longitude: location.longitude,
        baidu_lat: location.baidu_lat,
        baidu_lng: location.baidu_lng,
        open_soon: location.open_soon,
        region: location.region,
        sub_region: location.sub_region,
        city: location.city,
        address: location.address,
        country: location.country,
        data: location,
        updated_at: new Date().toISOString(),
      })
      .eq('location_id', location.location_id);

    // add history entry
    await supabase.from('tesla_locations_changes').insert({ location_id: location.location_id, diff: JSON.parse(JSON.stringify(diff)) });
  } else {
    console.log(`Adding new location ${location.location_id}`);
    // entry doesn't exists, insert it
    await supabase.from('tesla_locations').insert({
      chargers: location.chargers,
      geocode: location.geocode,
      is_gallery: location.is_gallery,
      latitude: location.latitude,
      longitude: location.longitude,
      baidu_lat: location.baidu_lat,
      baidu_lng: location.baidu_lng,
      open_soon: location.open_soon,
      region: location.region,
      sub_region: location.sub_region,
      city: location.city,
      address: location.address,
      country: location.country,
      location_id: location.location_id,
      data: location,
      updated_at: new Date().toISOString(),
    });
  }
}
