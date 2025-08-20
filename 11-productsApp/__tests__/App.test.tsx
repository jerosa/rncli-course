/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ProductsApp } from '../src/ProductsApp';

test( 'renders correctly', async () => {
  await ReactTestRenderer.act( () => {
    ReactTestRenderer.create( <ProductsApp /> );
  } );
} );
