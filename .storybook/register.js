import React from 'react';
import { addons, types } from '@storybook/addons';
import styled from 'styled-components';

const AnnouncementBanner = styled.div`
  align-items: center;
  color: #2b2b2b;
  display: flex;
  margin: auto 32px;
  font-size: 14px;
  font-weight: bold;
  background-color: #e0e6ec;
  border-radius: 8px;
  padding: 4px 12px;

  a {
    color: #2b2b2b;
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }
`;

addons.register('storybook/button-widget', () => {
  addons.add('storybook/button-widget', {
    title: 'Button-widget',
    type: types.TOOL,
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => (
      <AnnouncementBanner>
        <span>
          💬&nbsp;For inquiries or feature requests, find us on the&nbsp;
          <a href="https://moveinc.slack.com/archives/CHCH9CZQW">#rdc-ui</a>&nbsp;Slack channel.
        </span>
      </AnnouncementBanner>
    ),
  });
});
