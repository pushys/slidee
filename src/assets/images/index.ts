import * as z from 'zod';

import { abstract } from './abstract';
import { abstract2 } from './abstract2';
import { abstract3 } from './abstract3';
import { airplane } from './airplane';
import { airplane2 } from './airplane2';
import { astronaut } from './astronaut';
import { basketball } from './basketball';
import { beach } from './beach';
import { beer } from './beer';
import { berries } from './berries';
import { building } from './building';
import { building2 } from './building2';
import { building3 } from './building3';
import { burger } from './burger';
import { butterfly } from './butterfly';
import { cake } from './cake';
import { camera } from './camera';
import { canyon } from './canyon';
import { car } from './car';
import { car2 } from './car2';
import { car3 } from './car3';
import { car4 } from './car4';
import { car5 } from './car5';
import { cat } from './cat';
import { cat2 } from './cat2';
import { chess } from './chess';
import { cocktail } from './cocktail';
import { coffee } from './coffee';
import { controller } from './controller';
import { dam } from './dam';
import { dish } from './dish';
import { dog } from './dog';
import { earth } from './earth';
import { earth2 } from './earth2';
import { fantasy } from './fantasy';
import { fish } from './fish';
import { flower } from './flower';
import { flowers } from './flowers';
import { footballField } from './football-field';
import { forest } from './forest';
import { forest2 } from './forest2';
import { galaxy } from './galaxy';
import { glass } from './glass';
import { golf } from './golf';
import { hardware } from './hardware';
import { helicopter } from './helicopter';
import { hotAirBalloon } from './hot-air-balloon';
import { house } from './house';
import { jetEngine } from './jet-engine';
import { juice } from './juice';
import { keyboard } from './keyboard';
import { laptop } from './laptop';
import { leaves } from './leaves';
import { mailbox } from './mailbox';
import { moon } from './moon';
import { motorcycle } from './motorcycle';
import { mountains } from './mountains';
import { painting } from './painting';
import { painting2 } from './painting2';
import { pancakes } from './pancakes';
import { parrot } from './parrot';
import { piano } from './piano';
import { ramen } from './ramen';
import { resort } from './resort';
import { resort2 } from './resort2';
import { road } from './road';
import { robot } from './robot';
import { sculpture } from './sculpture';
import { sculpture2 } from './sculpture2';
import { seaTurtle } from './sea-turtle';
import { skyscraper } from './skyscraper';
import { skyscraper2 } from './skyscraper2';
import { smartphone } from './smartphone';
import { soda } from './soda';
import { sportsman } from './sportsman';
import { stadium } from './stadium';
import { stars } from './stars';
import { subway } from './subway';
import { toucan } from './toucan';
import { watch } from './watch';
import { wheat } from './wheat';
import { yacht } from './yacht';

export const images = {
  dam,
  astronaut,
  laptop,
  stadium,
  abstract,
  keyboard,
  earth2,
  car5,
  camera,
  watch,
  galaxy,
  soda,
  house,
  subway,
  burger,
  car2,
  road,
  golf,
  abstract3,
  hardware,
  car4,
  parrot,
  dish,
  skyscraper2,
  glass,
  robot,
  forest2,
  airplane,
  leaves,
  helicopter,
  skyscraper,
  resort,
  beach,
  chess,
  car3,
  flowers,
  cat,
  hotAirBalloon,
  seaTurtle,
  sculpture,
  painting,
  car,
  fish,
  abstract2,
  building3,
  earth,
  sportsman,
  jetEngine,
  footballField,
  motorcycle,
  controller,
  sculpture2,
  mailbox,
  toucan,
  juice,
  resort2,
  ramen,
  cat2,
  basketball,
  wheat,
  butterfly,
  dog,
  flower,
  pancakes,
  building,
  forest,
  stars,
  airplane2,
  piano,
  coffee,
  mountains,
  moon,
  building2,
  cocktail,
  yacht,
  beer,
  painting2,
  canyon,
  berries,
  cake,
  fantasy,
  smartphone,
};

export type ImageKey = keyof typeof images;

export const imageKeys = Object.keys(images) as ImageKey[];
export const imageKeySchema = z.enum(imageKeys);
