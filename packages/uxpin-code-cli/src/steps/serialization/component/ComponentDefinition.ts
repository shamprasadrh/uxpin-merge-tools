import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { ComponentExample } from './examples/ComponentExample';
import { ComponentPropertyDefinition } from './implementation/ComponentPropertyDefinition';

export interface ComponentMetadata {
  name:string;
  properties:ComponentPropertyDefinition[];
}

export interface ComponentDefinition extends ComponentMetadata {
  // @todo: documentation should in form of Markdown converted to draft.js format
  documentation:{ examples:ComponentExample[] };
  info:ComponentInfo;
  // @todo: define preset structure type
  presets:any[];
}
