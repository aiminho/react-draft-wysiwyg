/* @flow */

import React from 'react';
import {
  EditorState,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import { expect, assert } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { IntlProvider } from 'react-intl';

import ColorPicker from '..';
import defaultToolbar from '../../../../config/defaultToolbar';
import ModalHandler from '../../../../event-handler/modals';

describe('ColorPicker test suite', () => {
  const contentBlocks = convertFromHTML('<div>test</div>');
  const contentState = ContentState.createFromBlockArray(contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  it('should have a div when rendered', () => {
    expect(mount(
      <IntlProvider locale="en">
        <ColorPicker
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.colorPicker}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    ).html().startsWith('<div')).to.be.true;
  });

  it('should correctly set default state values', () => {
    const control = mount(
      <IntlProvider locale="en">
        <ColorPicker
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.colorPicker}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    const colorPicker = control.find('ColorPicker');
    const state = colorPicker.node.state;
    assert.isNotTrue(state.showModal);
    assert.equal(state.currentStyle, 'color');
    assert.isUndefined(state.currentColor);
    assert.isUndefined(state.currentBgColor);
  });

  it('should set variable signalShowModal to true when first child is clicked', () => {
    const control = mount(
      <IntlProvider locale="en">
        <ColorPicker
          onChange={() => {}}
          editorState={editorState}
          config={defaultToolbar.colorPicker}
          modalHandler={new ModalHandler()}
        />
      </IntlProvider>
    );
    const colorPicker = control.find('ColorPicker');
    assert.isNotTrue(colorPicker.node.signalShowModal);
    control.find('Option').simulate('click');
    assert.isTrue(colorPicker.node.signalShowModal);
  });
});
