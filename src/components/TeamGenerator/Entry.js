import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
//import path from 'path'
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
// https://reacttraining.com/blog/react-router-v5-1/

import {Div, Table, Tr, Td} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/IconLoading'

import IconConfirmed from '../../svgs/IconConfirmed'
import IconPending from '../../svgs/IconPending'
import IconInfo from '../../svgs/IconInfo'
import IconStar from '../../svgs/IconStar'

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });

const DivEntry = styled(Div)`
  width: 100%;
  max-width: 600px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`;

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;
  
  margin-bottom: 10px;
`

const DivDescription = styled(Div)`
  font-weight: medium;
  margin-bottom: 15px;
`

const DivTableEntry = styled(Div)`
  
  padding-left: 20px;
  padding-right: 20px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/

const DivRowHeader = styled(Div)`
  color: ${props => props.theme.color_weak};

  display: grid;
  grid-template-columns: 40px 1fr  minmax(40px, 90px) 60px 40px 40px; /* min entire = 400 - 20*2 = 360 */
  grid-template-rows: 24px;
  
  & > Div {
    font-weight: thin;
  }
  //background-color: ${props => props.theme.COLOR_normal};
   
  //border-radius:  8px;
`


const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 40px 1fr  minmax(40px, 90px) 60px 40px 40px; // min entire = 400 - 20*2 = 360
  grid-template-rows: 40px;
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  &:last-child {
    border-bottom-style: none;
  }
`

/*
const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; 
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(2) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }

*/


const DivBattletagHeader = styled(Div)`
  padding-left: 10px;
  
  display: block;
  text-algin: left;
`

const DivBattletag = styled(Div)`
  padding-left: 10px;
  display: block;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`




const RowPlayer = ({battletag, mmr, statusPlayer}) => {
  
  useEffect(()=>{console.log("Each row has been rerendered")})
  
  const IconStatus = {
    pending: <IconPending width={"20px"} height={"20px"} />
    ,confirmed: <IconConfirmed width={"20px"} height={"20px"} />
  };

  return (
    
    <DivRowPlayer >
      
      <Div> 
        <IconStar
          width={"20px"}
          height={"20px"}
          isFilled={false}
        />  
      </Div>
      
      <DivBattletag> 
        {battletag}
      </DivBattletag>
      
      <Div> 
        (roles)
      </Div>
      
      
      <Div> 
        {mmr}
      </Div>
       
      <Div> 
        {IconStatus[statusPlayer]}
      </Div>
        
       
      <Div> 
        <IconInfo
          width={"20px"}
          height={"20px"}
        /> 
      </Div>
         
    </DivRowPlayer>
  )
}




const Entry = ({listPlayerEntry}) => {
  
  useEffect(()=>{console.log("Entry has been rerendered")})
  
  
  return (
  
  <DivEntry>
    
    <DivEntryTitle> Entry </DivEntryTitle>
    <DivDescription> {`${listPlayerEntry.length} players`} </DivDescription>
    
    
    <DivTableEntry> 
    
    <DivRowHeader> 
      <Div> leader </Div>
      <DivBattletagHeader>  battletag </DivBattletagHeader>
      <Div> roles </Div>
      <Div> mmr </Div>
      <Div> status </Div>
      
       
      <Div> </Div>
    </DivRowHeader>
    
    { 
      ( listPlayerEntry ).map( (player, i) =>
      
        < RowPlayer 
          key={ `${player._id}_${(new Date().getTime()).toString()}` }
          battletag={player._id} 
          mmr={player.mmr.standard.NA} 
          statusPlayer={player.status} 
        /> 
      )
    }
      
    </DivTableEntry>
    
    
  </DivEntry>
    
  )
}

	  
//<button onClick= {refetch} > Refectch </button>



function mapStateToProps(state) { 
  return { 
    listPlayerEntry: [...state.planTeam.listPlayerEntry]
    //,workingAddPlayerToListPlayerEntry: state.working.addPlayerToListPlayerEntry
    //,readyPlanTeam: state.ready.planTeam
    //,loading: state.loading
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Entry);