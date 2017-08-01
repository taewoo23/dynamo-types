import { Attribute as AttributeMetadata } from '../metadata';
import { Table, ITable } from '../table';

// Table Decorator
export function Attribute<T>(options: {
  name?: string;
} = {}) {
  return (record: Table, propertyKey: string) => {
    console.log("Attribute");
    console.log(record, propertyKey);

    const tableClass = (record.constructor as ITable<any>);

    const nativeType = Reflect.getMetadata("design:type", record, propertyKey);

    console.log(tableClass.metadata);

    tableClass.metadata.attributes.push(
      {
        name: options.name || propertyKey,
        type: _nativeTypeToAttributeMetadataType(nativeType),
      }
    );

    console.log(tableClass.metadata);
  }
}

function _nativeTypeToAttributeMetadataType(nativeType: any) {
  if (nativeType == String) {
    return AttributeMetadata.Type.String;
  } else if (nativeType == Number) {
    return AttributeMetadata.Type.Number;
  } else if (nativeType == Boolean) {
    return AttributeMetadata.Type.Boolean;
  } else if (nativeType == Array) {
    return AttributeMetadata.Type.Array;
  } else if (nativeType == Object) {
    return AttributeMetadata.Type.Map;
  } else {
    throw new Error(`Unsupported type ${nativeType}`);
  }
}