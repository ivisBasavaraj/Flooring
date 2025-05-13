import {Catalog} from 'react-planner';

let catalog = new Catalog();

// Import holes
import WindowElement from './holes/window/planner-element.jsx';
import SashWindowElement from './holes/sash-window/planner-element.jsx';
import VenetianBlindWindowElement from './holes/venetian-blind-window/planner-element.jsx';
import WindowCurtainElement from './holes/window-curtain/planner-element.jsx';
import DoorElement from './holes/door/planner-element.jsx';
import DoorDoubleElement from './holes/door-double/planner-element.jsx';
import PanicDoorElement from './holes/panic-door/planner-element.jsx';
import PanicDoorDoubleElement from './holes/panic-door-double/planner-element.jsx';
import SlidingDoorElement from './holes/sliding-door/planner-element.jsx';

// Register elements
catalog.registerElement(WindowElement);
catalog.registerElement(SashWindowElement);
catalog.registerElement(VenetianBlindWindowElement);
catalog.registerElement(WindowCurtainElement);
catalog.registerElement(DoorElement);
catalog.registerElement(DoorDoubleElement);
catalog.registerElement(PanicDoorElement);
catalog.registerElement(PanicDoorDoubleElement);
catalog.registerElement(SlidingDoorElement);

// Register categories
catalog.registerCategory('windows', 'Windows', [
  WindowElement,
  SashWindowElement,
  VenetianBlindWindowElement,
  WindowCurtainElement
]);

catalog.registerCategory('doors', 'Doors', [
  DoorElement,
  DoorDoubleElement,
  PanicDoorElement,
  PanicDoorDoubleElement,
  SlidingDoorElement
]);

export default catalog;
