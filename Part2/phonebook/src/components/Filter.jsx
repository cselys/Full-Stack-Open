import React, { useState } from 'react';

export const Filter = (props) => {
	
	return (
		 <div>
          filter shown with: <input value = {props.newFilter} onChange ={props.onChange}/>
        </div>	 
	)
}

