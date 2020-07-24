import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";
import {Div} from '../../styles/DefaultStyles';


const DivContainer = styled(Div)`
	
`;


const IconPenBrush= ({width, height, themeName}) => {
	
	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			
			width="100%"
			height="100%"
			viewBox="0 0 512 512"
			
			fill={ themes[themeName]["color_weak"] }
			>
			
			<path 
	d="M433.43 365.35c-20.56-54.19-55.01-73.83-93.93-79.66l153.76-153.76c24.99-24.99 24.99-65.52-.01-90.51l-22.68-22.68C458.07 6.25 441.69 0 425.32 0c-16.38 0-32.76 6.25-45.25 18.74L240.21 158.57 158.15 35.86C140.34 10.45 116.87.01 93.48.01 28.72.01-35.44 80.03 22.84 144.06l110.42 121.45L19.08 379.66.33 487.1C-1.98 500.33 8.34 512 21.18 512c1.23 0 2.47-.11 3.74-.33l107.45-18.84 93.72-93.72C232.09 444.02 260.26 512 368 512c101.33 0 144-81.42 144-174.07-11.01 7.52-49.66 38.65-62.15 38.65-7.42 0-13.77-4.24-16.42-11.23zM414 52.68c5.82-5.82 15.98-6.64 22.63 0l22.68 22.68c5.81 5.8 6.66 15.97 0 22.63l-51.69 51.69-45.31-45.31L414 52.68zM58.33 111.75c-10.61-11.65-12.94-22.26-7.58-34.39 7.15-16.18 26.32-29.35 42.72-29.35 6.26 0 15.7 1.6 24.78 14.53l87.35 130.63-38.37 38.36-108.9-119.78zm50.81 336.42l-54.97 9.64 9.59-54.94 264.62-264.56 45.31 45.31-264.55 264.55zM368 464c-34.54 0-59.8-8.58-75.06-25.51-19.93-22.11-21.29-55.88-20.13-67.03l2.21-21.3 19.93-19.93 26.06 1.68c31.41 2.02 52.54 10.93 67.53 50.44 9.03 23.84 30.45 39.83 55.52 41.98C430.03 447.13 406.6 464 368 464z">
			</path>
				
		</svg>
	</DivContainer>
	)
	}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
  }; 
} 

/*
function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}
*/

export default connect(mapStateToProps)(IconPenBrush);