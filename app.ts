import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';
import { getAllLocations, getLocationDetails, saveLocation } from './locations';

import { Command } from 'commander';
const program = new Command();
// cli config
program
  .option('-s, --startIndex <index>', 'Starting index, random if not specified', '')
  .option('-l, --length <length>', 'Number of items to check', '255');

const options = program.opts();

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_SERVICE_KEY || '');

(async () => {
  const locations = await getAllLocations(parseInt(options.startIndex), parseInt(options.length));
  for (const location of locations) {
    const detailedLocation = await getLocationDetails(location.location_id);
    await saveLocation(detailedLocation, supabase);
  }
})();
