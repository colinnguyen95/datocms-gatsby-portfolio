import React from 'react';
import { ThemeConsumer } from 'styled-components';
import Button from './Button';
import './Arrow.css'

export default function ToggleMode() {
  return (
    <ThemeConsumer>
      {theme => (
        <Button className="toggle__mode"
          // variant="primary"
          onClick={e =>
            theme.setTheme(
              theme.mode === 'dark'
                ? { ...theme, mode: 'light' }
                : { ...theme, mode: 'dark' }
            )
          }
        >
          {theme.mode === 'dark' ? '🌚' : '🌞'}
          <div className="arrow">
            <span className="animate">&#8674;</span>
          </div>
        </Button>
      )}
    </ThemeConsumer>
  );
}
