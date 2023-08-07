import React, { useState } from 'react';

const Form = () => {
    const [formContent, setFormContent] = useState([{
        id: 0,
        name: "0",
        label: "Untitled Question",
        required: false,
        question_type: "short_answer",
        list: []
    }]);
    const [onEdit, setOnEdit] = useState(false);
    const [textField, setTextField] = useState("");
    const [editedField, setEditedField] = useState("");

    const addQuestion = () => {
        const field = {
            "name": `question_${formContent.length}`,
            "label": "Untitled question",
            required: false,
            "question_type": "short_answer", // "paragraph", "multichoice",
            "list": []
        };
        setFormContent([...formContent, field]);
    };

    const editField = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex !== -1) {
            formFields[fieldIndex].label = fieldLabel;
            setFormContent(formFields);
        }
    };

    const editFieldType = (fieldName, fieldLabel) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex !== -1) {
            formFields[fieldIndex].question_type = fieldLabel;
            setFormContent(formFields);
        }
    };

    const addFieldOption = (fieldName, option) => {
        const formFields = [...formContent];
        const fieldIndex = formFields.findIndex(f => f.name === fieldName);
        if (fieldIndex !== -1) {
            if (option && option !== "") {
                formFields[fieldIndex].list.push(option);
                setFormContent(formFields);
                setTextField("");
            }
        }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', padding: '0 16px', height: '100vh', width: '97%', gap: '16px', backgroundColor: '#F3F4F6', overflowX: 'hidden' }}>

          <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', backgroundColor: 'white', borderRadius: '0.375rem', justifyContent: 'center', alignItems: 'start', width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderTop: '0.5rem solid #667EEA', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '600' }}>Form Header</h1>
              <p style={{ color: 'rgba(0, 0, 0, 0.5)', textTransform: 'capitalize' }}>Form Description</p>
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '97%', gap: '16px' }}>
              {formContent.map((field) => {
                  return (
                      <div key={field.id} style={{ display: 'flex', backgroundColor: 'white', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4A5568', textTransform: 'capitalize' }}>
                                      {onEdit && editedField === field.name ? (
                                          <input
                                              type="text"
                                              value={field.label}
                                              onChange={(e) => editField(field.name, e.target.value)}
                                              onBlur={() => {
                                                  setOnEdit(false);
                                                  setEditedField("");
                                              }}
                                              style={{ padding: '0.25rem', border: '1px solid #CBD5E0', borderRadius: '0.25rem' }}
                                          />
                                      ) : (
                                          <label
                                              onClick={() => {
                                                  setOnEdit(true);
                                                  setEditedField(field.name);
                                              }}
                                              style={{ cursor: 'pointer' }}
                                          >
                                              {field.label}
                                          </label>
                                      )}
                                  </div>
                                  <div>
                                      <select
                                          onChange={(e) => editFieldType(field.name, e.target.value)}
                                          style={{ padding: '0.25rem', border: '1px solid #CBD5E0', borderRadius: '0.25rem' }}
                                      >
                                          <option value="short_answer">Short Answer</option>
                                          <option value="paragraph">Paragraph</option>
                                          <option value="multichoice">Multichoice</option>
                                      </select>
                                  </div>
                              </div>

                                <div className='my-4 w-full'>
                                    {
                                        field.question_type === 'short_answer' && <input type="text" className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {
                                        field.question_type === 'paragraph' && <textarea rows={4} className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {field.question_type === 'multichoice' &&
                                        <div className='my-4 flex flex-col space-y-2'>
                                            <select
                                                className='px-5 shadow-sm h-10 rounded-md block w-full'>
                                                {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                            <div className='flex space-between'>
                                                <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className='flex-1' />
                                                <button className='bg-indigo-700 block hover:bg-indigo-900 text-white px-4' onClick={() => addFieldOption(field.name, textField)}>Add</button>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>


                        </div>
                    );
                })}
                <div className='absolute top-0 -right-16 flex flex-col items-center bg-white p-2 rounded-md shadow-md'>
                    <button onClick={() => addQuestion()}>Add question</button>
                </div>
            </div>

{/* preview area */}
     
            <div style={{ display: 'flex', flexDirection: 'column', padding: '16px', backgroundColor: 'white', borderRadius: '0.375rem', justifyContent: 'center', alignItems: 'start', width: '100%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', borderTop: '0.5rem solid #667EEA', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: '600' }}>Form preview</h1>
              <p style={{ color: 'rgba(0, 0, 0, 0.5)', textTransform: 'capitalize' }}>Form Description</p>
          </div>
          


          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '97%', gap: '16px' }}>
              {formContent.map((field) => {
                  return (
                      <div key={field.id} style={{ display: 'flex', backgroundColor: 'white', borderRadius: '0.375rem', width: '100%', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '16px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4A5568', textTransform: 'capitalize' }}>
                                      {onEdit && editedField === field.name ? (
                                          <input
                                              type="text"
                                              value={field.label}
                                              onChange={(e) => editField(field.name, e.target.value)}
                                              onBlur={() => {
                                                  setOnEdit(false);
                                                  setEditedField("");
                                              }}
                                              style={{ padding: '0.25rem', border: '1px solid #CBD5E0', borderRadius: '0.25rem' }}
                                          />
                                      ) : (
                                          <label
                                              onClick={() => {
                                                  setOnEdit(true);
                                                  setEditedField(field.name);
                                              }}
                                              style={{ cursor: 'pointer' }}
                                          >
                                              {field.label}
                                          </label>
                                      )}
                                  </div>
                                
                              </div>

                                <div className='my-4 w-full'>
                                    {
                                        field.question_type === 'short_answer' && <input type="text" className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {
                                        field.question_type === 'paragraph' && <textarea rows={4} className="px-5 shadow-sm h-10 rounded-md block w-full" placeholder={field.label} />
                                    }
                                    {field.question_type === 'multichoice' &&
                                        <div className='my-4 flex flex-col space-y-2'>
                                            <select
                                                className='px-5 shadow-sm h-10 rounded-md block w-full'>
                                                {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                            <div className='flex space-between'>
                                                <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className='flex-1' />
                                                <button className='bg-indigo-700 block hover:bg-indigo-900 text-white px-4' onClick={() => addFieldOption(field.name, textField)}>Add</button>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>


                        </div>
                    );
                })}
              
            </div>





           


        </div>

    );
};

export default Form;
