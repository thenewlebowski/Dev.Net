import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import axios from 'axios';

import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CLabel,
    CRow,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../../tool';



export default function Form() {
    let [ editorJS, setInstance ] = useState('');
    let [ title, setTitle ]       = useState('');
    let [ date, setDate ]         = useState('');

    const state = useSelector(state => state);

    const testBody = (e) => {
      console.log(e);
    }
    
    const btnSubmit = () => {
      const data = 
      {
        title,
        date,
      }
      
      editorJS.save()
        .then(output => {
          data.body = output;
          axios.post(process.env.REACT_APP_PROXY + "/post/create", data)
            .then(res  => console.log(res))
            .catch(err => console.log(err))
        })
        .catch(err => console.log('[Form Submit] Add error handling'))
    }
    
    const btnReset = () => {
      //reset all values back to empty
    }

    return (
        <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              New Post
              <small className="float-right"><i> bring something new to the table</i></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
               
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="title-input">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="title-input" name="title-input" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                    <CFormText>Come up with a clever title that will attract a brilliant audience</CFormText>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">*Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date"  value={date} onChange={e => setDate(e.target.value)}/>
                    <CFormText>What date do you want this post to go live <i>(optional)</i></CFormText>
                  </CCol>
                </CFormGroup>
              
                <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Body</CLabel>
                    </CCol>
                    <CCol md="9">
                      <div className="editor-js-container">
                        <EditorJs
                        style={{border: '1px solid black'}}
                        tools={ EDITOR_JS_TOOLS }
                        instanceRef={instance => setInstance(instance)}
                        data={editorJS}
                        />
                      </div>
                    </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="tag-input">Tags</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="tag-input" name="tag-input" placeholder="Tags" />
                    <CFormText>What kind of tags should go along with this post</CFormText>
                  </CCol>
                </CFormGroup>

              </CForm>
              <CFormGroup row>
                <CCol md="3">
                    <CLabel>Posted By</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <p className="form-control-static float-right"><i>Coltonn</i></p> 
                </CCol>
            </CFormGroup>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" onClick={() => btnSubmit()} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
         
        </CCol>
      </CRow>
    )
}
