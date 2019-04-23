import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../serializeTSComponent';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { serializeLiteralType } from './serializeLiteralType';
import { serializeTypeLiteral } from './serializeTypeLiteral';
import { serializeTypeReference } from './serializeTypeReference';
import { serializeUnionType } from './serializeUnionType';

export function convertTypeNodeToPropertyType(context:TSSerializationContext, typeNode:ts.TypeNode):PropertyType {
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return { name: 'string', structure: {} };
    case ts.SyntaxKind.NumberKeyword:
      return { name: 'number', structure: {} };
    case ts.SyntaxKind.BooleanKeyword:
      return { name: 'boolean', structure: {} };
    case ts.SyntaxKind.AnyKeyword:
      return { name: 'any', structure: {} };
    case ts.SyntaxKind.ArrayType:
      return { name: 'array', structure: {} };
    case ts.SyntaxKind.FunctionType:
      return { name: 'func', structure: {} };
    case ts.SyntaxKind.ObjectKeyword:
      return { name: 'shape', structure: {} };
    case ts.SyntaxKind.UnionType:
      return serializeUnionType(context, typeNode as ts.UnionTypeNode);
    case ts.SyntaxKind.LiteralType:
      return serializeLiteralType(typeNode as ts.LiteralTypeNode);
    case ts.SyntaxKind.TypeReference:
      return serializeTypeReference(context, typeNode as ts.TypeReferenceNode);
    case ts.SyntaxKind.TypeLiteral:
      return serializeTypeLiteral(typeNode as ts.TypeLiteralNode);
    case ts.SyntaxKind.IndexedAccessType:
      const objectType:ts.TypeNode = (typeNode as ts.IndexedAccessTypeNode).objectType;
      const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(typeNode);
      const typeSymbol:ts.Symbol = typeFromTypeNode.symbol || typeFromTypeNode.aliasSymbol;
    default:
      return serializeAsUnsupportedType(typeNode);
  }
}
