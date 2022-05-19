import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';
import { getAllLocations, getLocationDetails, saveLocation } from './locations';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '');

(async () => {
  const locations = await getAllLocations();
  for (const location of locations) {
    const detailedLocation = await getLocationDetails(location.location_id);
    await saveLocation(detailedLocation, supabase);
  }
})();
