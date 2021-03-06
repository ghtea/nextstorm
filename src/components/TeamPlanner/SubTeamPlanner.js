import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch, useLocation } from 'react-router-dom';

import * as config from '../../config';

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../../redux/actions/hots";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import {Div, Input, Button, NavLinkDefault} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/basic/IconLoading';

import IconList from '../../svgs/basic/IconList';
import IconCreate from '../../svgs/basic/IconCreate';
import IconEdit from '../../svgs/basic/IconEdit';



const DivSubTeamPlanner = styled(Div)`

  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  color: ${props => props.theme.color_normal};
  
  
  position: fixed;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  z-index: 10;
  
  top: 50px;
  
  width: 100%;
  /*max-width: 360px;*/
  
  height: 40px; 
    


  @media (min-width:  ${props => (props.theme.media.md) }px) {
    top: 70px;
    width: auto;
    border: 1px solid ${props => props.theme.color_very_weak};
    border-radius: 25px;
  }
  
`


const activeClassName = 'nav-link-active';


const NavLinkStyled = styled(NavLinkDefault).attrs({ activeClassName })`
  
  font-size: 1rem;
  
  width: auto;
  
  margin-left: 8px;
  margin-right: 8px;
  
  &:first-child { margin-left: 16px; }
  &:last-child { margin-right: 16px; }
  
  color: ${props => props.theme.color_weak};
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
	
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
		font-weight: bold;
	}
	
	
	& > div {
	  width: auto;
	  margin-left: 3px;
    margin-right: 3px;
    
	}
	
	/*hide text on mobile*/
	& > div:nth-child(2) {
	  display: none;
	  
	  @media (min-width:  ${props => (props.theme.media.md) }px) {
	    display: flex;
	    font-size: 0.9rem;
	  }
	}
`;



const checkActive = (regex) => {
  return regex.test(window.location.pathname);
}





const SubTeamPlanner = ({
  
  
  
  authority, language
 
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  const location = useLocation();
  
   return (
     
    <DivSubTeamPlanner>
    
      <NavLinkStyled to="/team-planner" exact={true}>
        <IconList width={"24px"} height={"24px"} color={(location.pathname==="/team-planner")?"color_active": "color_very_weak"} />
				<Div> 
				  
				  {(() => {
            switch (language) {
              case 'ko': 
                return '플랜 목록';
              case 'ja': 
                return 'プランリスト';
              default: // eng
                return 'Plan List';
            }
          })()} 
				
				</Div> 
			</NavLinkStyled> 

      { (/^(\/team-planner\/[\W\w]+)/).test(location.pathname) &&
  			<NavLinkStyled  to={`${location.href}`} isActive={()=>true} > 
          <IconEdit width={"22px"} height={"22px"} color={"color_active"} />
  				<Div> 
  				  {(() => {
              switch (language) {
                case 'ko': 
                  return '작성중';
                case 'ja': 
                  return '作成中';
                default: // eng
                  return 'Doing';
              }
            })()}  
  				</Div> 
  			</NavLinkStyled> 
			}
			
    </DivSubTeamPlanner>
      
    )
}

/*

<NavLinkStyled to="/team-planner/${}" isActive={()=>checkActive(/^(\/comp-gallery\/create)/)} > 
        <IconCreate width={"22px"} height={"22px"} color={(location.pathname==="/team-planner" && )?"color_active": "color_very_weak"} />
				<Div> Create </Div> 
			</NavLinkStyled> 
			
*/

/*
<DivMain>
          <Switch>
            <Route path="/comp-gallery" exact={true} component={SubGallery} />
            <Route path="/comp-gallery/focus"  component={SubFocus} />
            <Route path="/comp-gallery/create"  component={SubCreate} />
          </Switch>
        </DivMain>
*/
 
    

function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.comp_gallery
    , language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
  
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SubTeamPlanner);

