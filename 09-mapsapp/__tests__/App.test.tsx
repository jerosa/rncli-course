/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { MapsApp } from '../src/MapsApp';

test( 'renders correctly', async () => {
  await ReactTestRenderer.act( () => {
    ReactTestRenderer.create( <MapsApp /> );
  } );
} );
