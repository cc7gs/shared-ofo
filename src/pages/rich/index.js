import React, { useState } from 'react';
import { Card,Button,Modal } from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Editor } from 'react-draft-wysiwyg';
import {EditorState,convertToRaw} from 'draft-js'
import draftToHtml  from 'draftjs-to-html';

export default  () => {
  //保存编辑器状态
  const [editorState,setEditorState]=useState(()=>EditorState.createEmpty())
  //保存Modal状态
  const [modalState,setModalState]=useState(false);
  return (
    <>
    <Card>
        <Button onClick={()=>{setEditorState(EditorState.createEmpty())}}>清空内容</Button>
        <Button onClick={()=>{setModalState(true)}}>将文本转换为html</Button>
    </Card>
    <Card title="富本文编辑器">
      <Editor 
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          onEditorStateChange={(eState)=>setEditorState(eState)}
      />
    </Card>
    <Modal
      visible={modalState}
      title='富文本编辑器内容'
      onCancel={()=>{setModalState(false)}}
    >
    {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    </Modal>
    </>
  );
};
