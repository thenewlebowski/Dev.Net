import React from 'react'
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
    CTextarea,
    CInput,
    CLabel,
    CRow,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../../tool';

export default function Form() {
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
                    <CInput id="title-input" name="title-input" placeholder="Title" />
                    <CFormText>Come up with a clever title that will attract a brilliant audience</CFormText>
                  </CCol>
                </CFormGroup>
                
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">*Date</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
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
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
         
        </CCol>
      </CRow>
    )
}
