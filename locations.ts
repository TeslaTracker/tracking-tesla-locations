import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { detailedDiff } from 'deep-object-diff';
import { ITeslaLocationsListLocation } from './interfaces/interfaces';
import deepEqual from 'deep-equal';
/**
 *
 * @param startIndex Starting index, random if not specified
 * @param length Number of items to check
 * @returns
 */
export async function getAllLocations(startIndex?: number, length?: number): Promise<ITeslaLocationsListLocation[]> {
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
export async function getLocationDetails(location_id: string): Promise<object> {
  console.log(`Fetching infos for location ${location_id} ...`);
  const res = await axios.get(`https://www.tesla.com/cua-api/tesla-location?id=${location_id}`);
  return res.data;
}

/**
 * Save a location info
 * @param location
 * @param supabase
 */
export async function saveLocation(location: any, supabase: SupabaseClient): Promise<void> {
  console.log(`Saving location ${location.location_id} ...`);

  const existing = await supabase.from('tesla_locations').select('location_id, data').eq('location_id', location.location_id).limit(1);

  // entry exists, update it
  if (existing.data && existing.data[0]) {
    const existingLocation = existing.data[0];

    //stop if there is no difference
    if (deepEqual(existingLocation.data, location)) {
      return;
    }

    //generate a diff
    const diff = detailedDiff(existingLocation.data, location);
    // update item
    await supabase
      .from('tesla_locations')
      .update({
        data: location,
        updated_at: new Date(),
      })
      .eq('location_id', location.location_id);
    // add history entry
    await supabase.from('tesla_locations_changes').insert({ location_id: location.location_id, diff });
  }

  // entry doesn't exists, insert it
  await supabase.from('tesla_locations').insert({
    location_id: location.location_id,
    data: location,
    updated_at: new Date(),
  });
}
