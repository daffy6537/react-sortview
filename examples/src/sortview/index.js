import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Sortable from './sortable';

const SortView = (props) => (
    <div style={{position: 'relative'}}>
        <Sortable {...props}/>
    </div>
);
export default SortView;