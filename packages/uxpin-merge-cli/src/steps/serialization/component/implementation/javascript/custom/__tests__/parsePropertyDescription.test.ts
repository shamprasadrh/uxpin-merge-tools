import { ComponentPropertyCustomDescriptors } from '../../../ComponentPropertyDefinition';
import { parsePropertyDescription } from '../parsePropertyDescription';

describe('parsePropertyDescription', () => {
  it('should not add any custom property descriptors if not provided in description', () => {
    // given
    const desc:string = '';

    // when
    const descriptors:ComponentPropertyCustomDescriptors = parsePropertyDescription(desc);

    // then
    expect(descriptors).toEqual({});
  });

  it('should parse single descriptor', () => {
    // given
    const desc:string = '@uxpinpropname test';

    // when
    const descriptors:ComponentPropertyCustomDescriptors = parsePropertyDescription(desc);

    // then
    expect(descriptors).toEqual({
      customName: 'test',
    });
  });

  it('should parse multiple descriptors', () => {
    // given
    const desc:string = `@uxpindescription Some desc
@uxpinpropname test`;

    // when
    const descriptors:ComponentPropertyCustomDescriptors = parsePropertyDescription(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: 'Some desc',
      customName: 'test',
    });
  });

  it('should deal with multiline descriptors', () => {
    // given
    const desc:string = `@uxpindescription Multiline
awesome
description.
@uxpinpropname test`;

    // when
    const descriptors:ComponentPropertyCustomDescriptors = parsePropertyDescription(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: `Multiline
awesome
description.`,
      customName: 'test',
    });
  });

  it('should trim whitespaces', () => {
    // given
    const desc:string = `    @uxpindescription      Multiline
awesome     

     description.
   			@uxpinpropname      test     `;

    // when
    const descriptors:ComponentPropertyCustomDescriptors = parsePropertyDescription(desc);

    // then
    expect(descriptors).toEqual({
      customDescription: `Multiline
awesome

description.`,
      customName: 'test',
    });
  });
});
