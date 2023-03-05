import 'dotenv/config';
import { supabase } from './supabase';
import { getAllLocations, getLocationDetails, saveLocation } from './locations';

import { program } from 'commander';

// cli config
program
  .option('-s, --startIndex <index>', 'Starting index, random if not specified', '')
  .option('-l, --length <length>', 'Number of items to check', '255')
  .option('-fu, --forceUpdate', 'Force the locations to be updated , even if no changes is detected');

program.parse();

const options = program.opts();

(async () => {
  const locations = await getAllLocations(parseInt(options.startIndex), parseInt(options.length));
  for (const location of locations) {
    const detailedLocation = await getLocationDetails(location.location_id);
    await saveLocation(detailedLocation, supabase, options.forceUpdate);
  }
})();
