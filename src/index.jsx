import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Sortable from './sortable';

const SortView = (props) => {
    return (
        <div style={{position: 'relative'}}>
            <Sortable {...props}/>
        </div>
    );
};
export default SortView;