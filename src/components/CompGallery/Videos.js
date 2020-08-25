import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import Loading from '../_/Loading';
import Video from './Videos/Video';





const DivVideos = styled(Div)
`
  width: 100%;
  
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  flex-direction: row;
	}
`;


const DivListVideo = styled(Div)
`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
  
`





const Videos = ({

  language
  
  , user
  , readyUser, loadingUser
  
  , location
  
  
  , listVideo
  , readyListVideo
  , loadingListVideo

  , replaceData2CompGallery, replaceData2
  
  , addDeleteNotification
}) => {

  // clean up function! 이렇게 따로 만들어야 잘 작동한다!
  useEffect(()=>{
    return ()=> {
      replaceData2('ready', 'listVideo', false);
    };
  },[])
  
  useEffect(() => {

    (async() => {
      
      if (!readyListVideo && !loadingUser) {

        try {
          
          const queryRecieved = queryString.parse(location.search);
          
          let listSortUsing = ["createdNew"]
          if(queryRecieved.listSort){
            listSortUsing = JSON.parse(queryRecieved.listSort);
          }
          
          const queryRequestBefore = {
            
            listSort: listSortUsing
            , limitEach: queryRecieved.limitEach || 50  // test로서 3개씩 가져와 보자
            , skipEntire: queryRecieved.skipEntire || 0
            
            , idAuthor: queryRecieved.idAuthor
      
            , idUserLike: queryRecieved.idUserLike
            
            , idSubject: queryRecieved.idSubject
            , modelSubject: queryRecieved.modelSubject

          };
          
          
          if (readyUser) {
            queryRequestBefore['idUser'] = user._id;
          }
          
          const queryRequest = queryString.stringify(queryRequestBefore);
          
          replaceData2("ready", "listVideo", false);
          replaceData2("loading", "listVideo", true);
              
          const { data } = await axios.get(`${config.URL_API_NS}/video/?` + queryRequest );
            
          //console.log(data)
          
          replaceData2CompGallery("videos", "listVideo", data);
          replaceData2("ready", "listVideo", true);
          replaceData2("loading", "listVideo", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }
      } // if

    })() // async

  }, [readyListVideo, readyUser])


  return (

  <DivVideos>


    {(loadingListVideo) ? <Loading/> :
      <DivListVideo>

        {listVideo.map(element=>
          
          <Video 
            key={element._id}
            video={element}
            where="videos"
            />
          
        )}
       
      </DivListVideo>
    }

    </DivVideos>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    , loadingUser: state.basic.loading.user
    
    , listVideo: state.comp_gallery.videos.listVideo
    , readyListVideo: state.basic.ready.listVideo
    , loadingListVideo: state.basic.loading.listVideo
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement)),
    replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    ,
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    ,
    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Videos);