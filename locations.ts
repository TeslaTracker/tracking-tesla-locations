import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { detailedDiff } from 'deep-object-diff';
import { ITeslaLocationsListLocation } from './interfaces/interfaces';

export async function getAllLocations(): Promise<ITeslaLocationsListLocation[]> {
  console.log(`Retrieving all locations...`);
  const res = await axios.get('https://www.tesla.com/cua-api/tesla-locations');
  console.log(`${res.data.length} locations retrieved.`);
  return res.data;
}

export async function getLocationDetails(location_id: string): Promise<object> {
  console.log(`Fetching infos for location ${location_id} ...`);
  const res = await axios.get(`https://www.tesla.com/cua-api/tesla-location?id=${location_id}`);
  return res.data;
}

export async function saveLocation(location: any, supabase: SupabaseClient): Promise<void> {
  console.log(`Saving location ${location.location_id} ...`);

  const existing = await supabase.from('tesla_locations').select('location_id, data').eq('location_id', location.location_id).limit(1);

  // entry exists, update it
  if (existing.data && existing.data[0]) {
    //generate a diff
    const diff = detailedDiff(existing.data[0].data, location);
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
  });
}
