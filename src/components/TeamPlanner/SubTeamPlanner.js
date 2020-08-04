import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../../config';

/*
import {SubGallery} from "./Gallery"
import {SubFocus} from "./Focus"
import {SubCreate} from "./Create"
*/

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../../redux/actions/hots";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import {Div, Input, Button, NavLinkDefault} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/basic/IconLoading'



const DivSubCompGalleryBack = styled(Div)`

  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  
  
  position: fixed;
  flex-direction: row;
  z-index: 10;
  

  top: 50px;
  width: 100%;
  height: 40px; 
    


  @media (min-width:  ${props => (props.theme.media.md) }px) {
    top: 70px;
    border-radius: 25px;
    width: 740px;
  }
  
`

const DivSubCompGallery = styled(Div)`
  
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
`

const NavLinkStyled = styled(NavLinkDefault)`
  
  font-size: 1rem;
  
  width: 60px;
  
  
  margin-left: 8px;
  &:first-child { margin-left: 16px; }
  
  margin-right: 8px;
  
 /*border-bottom: 1px solid ${props => props.theme.color_normal};*/

  text-decoration: none;
  color: ${props => props.theme.color_normal};
`



const DivMain = styled(Div)`
  
`



const SubCompGallery = ({
  
  match, location
  
  , authority, language
 
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  
   return (
    <DivSubCompGalleryBack>
      <DivSubCompGallery>

        <NavLinkStyled to="/comp-gallery" > 
  				<Div> Gallery </Div> 
  			</NavLinkStyled> 
  		
 
        <NavLinkStyled to="/comp-gallery/create" > 
  				<Div> Create </Div> 
  			</NavLinkStyled> 
    
    		
    		
        
        
      </DivSubCompGallery>
    </DivSubCompGalleryBack>
    )
}
  
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
export default connect(mapStateToProps, mapDispatchToProps)(SubCompGallery);
