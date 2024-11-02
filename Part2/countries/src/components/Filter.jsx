import React, { useState } from 'react';

export const Filter = (props) => {
	
	return (
		 <div>
          find countries: <input value = {props.newFilter} onChange ={props.onChange}/>
        </div>	 
	)
}

