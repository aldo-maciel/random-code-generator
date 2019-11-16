import React from 'react';
import { CodesRender } from './components/codes/codes.render';

export class App extends React.Component {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (<CodesRender/>);
    }
}
