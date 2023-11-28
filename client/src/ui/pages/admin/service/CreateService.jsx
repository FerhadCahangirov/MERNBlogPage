import Badge from 'react-bootstrap/Badge';
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import getCookie from '../../../Utils/getToken';
import getToken from '../../../Utils/getToken';
import { UserContext } from '../../../Contexts/userContext';

const CreateService = () => {

    const validationList = ["postError", "paragraphError", "validationPassed"];

    const [paragraphs, setParagraphs] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [userData, setUserData] = useContext(UserContext);

    const addParagraph = (e) => {
        setParagraphs([...paragraphs, {
            id: new Date().getTime().toString(),
            title: "",
            text: ""
        }]);
    };

    useEffect(() => {
        setConfirm(validationList[2]);
        if (title === "" || description === "") {
            setConfirm(validationList[0]);
        } else {
            if (paragraphs !== [{ "title": "", "text": "" }] || paragraphs !== []) {
                paragraphs.map(paragraph => {
                    if (paragraph.text === "") {
                        setConfirm(validationList[1]);
                    }
                });
            }
        }
    }, [title, description, paragraphs]);


    const handleSubmit = event => {
        event.preventDefault();

        const paragraphsList = paragraphs.map(paragraph => {
            return {
                "title": paragraph.title,
                "text": paragraph.text
            }
        });

        const paragraphsArray = [...paragraphsList];

        const data = {
            "title": title,
            "description": description,
            "paragraphs": [...paragraphsArray],
        };

        console.log(JSON.stringify(data));

        if (confirm === validationList[2]) {

            const TOKEN = getToken();

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
                body: JSON.stringify(data),
                credentials: 'include',
            };

            fetch("http://localhost:8080/services/", requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.success) {
                        Swal.fire({ icon: 'success', title: 'Success', text: response.message });
                        setParagraphs([]);
                        setTitle("");
                        setDescription("");
                        setRedirect(true);
                    } else
                        Swal.fire({ icon: 'error', title: 'Error', text: response.message });
                }).catch(error => Swal.fire({ icon: 'error', title: 'Error', title: error.message, text: error.stack }));

        } else if (confirm === validationList[0]) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill both the title and description!',
            });
        } else if (confirm === validationList[1]) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please type text to the all paragraphs !',
            });
        }
    };

    if (redirect) {
        return <Navigate to={'/admin/services'} />;
    };

    const deleteParagraph = paragraphId => {
        const newParagraphsArray = paragraphs.filter(paragraph => paragraph.id !== paragraphId);
        setParagraphs(newParagraphsArray);
    }

    return (
        <>
            <div className='main_content_create_iner overly_inner'>
                <div className="row">
                    <div class="col-12">
                        <div class="page_title_box d-flex align-items-center justify-content-between">
                            <div class="page_title_left">
                                <h3 class="f_s_30 f_w_700 text_white">Create Service</h3>
                                <ol class="breadcrumb page_bradcam mb-0">
                                    <li class="breadcrumb-item"><a>Admin Panel</a></li>
                                    <li class="breadcrumb-item active">Create Service</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop: '2rem'}}>
                    <form className='m-5' onSubmit={handleSubmit}>

                        <div className="field field_v1">
                            <label className="ha-screen-reader">Title</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" value={title} onChange={(event) => setTitle(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Title</span>
                            </span>
                        </div>

                        <div className="field field_v1">
                            <label className="ha-screen-reader">Description</label>
                            <input id="first-name" className="field__input" placeholder="e.g. Stanislav" value={description} onChange={(event) => setDescription(event.target.value)} />
                            <span className="field__label-wrap" aria-hidden="true">
                                <span className="field__label">Description</span>
                            </span>
                        </div>

                        <br />
                        <br />
                        <br />

                        {
                            paragraphs.map(paragraph => {
                                return (
                                    < >
                                        <div className="row">
                                            <div className='column' style={{ 'width': '75%' }}>
                                                <div className='btn btn-secondary btn-rounded' style={{ 'float': 'right' }} onClick={() => {
                                                    deleteParagraph(paragraph.id);
                                                }}>
                                                    X
                                                </div>
                                            </div>


                                            <div className="column">
                                                <div className="field field_v1">
                                                    <label className="ha-screen-reader">Paragraph Title</label>
                                                    <input id="first-name" className="field__input" placeholder="e.g. Stanislav" value={paragraphs.find(prgh => prgh.id === paragraph.id).title}
                                                        onChange={(e) => {
                                                            let newParagraphsArray = paragraphs.map(prgh => {
                                                                return prgh.id === paragraph.id ? { id: prgh.id, title: e.target.value, text: prgh.text } : prgh
                                                            });
                                                            setParagraphs(newParagraphsArray);
                                                        }} />
                                                    <span className="field__label-wrap" aria-hidden="true">
                                                        <span className="field__label">Paragraph Title</span>
                                                    </span>
                                                </div>

                                                <div className="paragraph_textarea_container">

                                                    <div className="paragraph_textarea_box">
                                                        <textarea id="editor" rows="8" className="paragraph_textarea" placeholder="Write an article..."
                                                            value={paragraphs.find(prgh => prgh.id === paragraph.id).text}
                                                            onChange={(e) => {
                                                                let newParagraphsArray = paragraphs.map(prgh => {
                                                                    return prgh.id === paragraph.id ? { id: prgh.id, title: prgh.title, text: e.target.value } : prgh
                                                                });
                                                                setParagraphs(newParagraphsArray);
                                                            }}
                                                        ></textarea>
                                                    </div>

                                                </div>
                                            </div>
                                        </div >

                                    </>
                                )
                            })
                        }

                        <div className="column">
                            <div onClick={addParagraph} className="btn btn-rounded m-2" style={{ cursor: 'pointer' }} >
                                Add Paragraph
                            </div>

                            <  button type="submit" className="m-2 btn btn-dark btn-rounded">
                                Submit
                            </  button>
                        </div>

                    </form >
                </div>

            </div>
        </>
    );
};



export default CreateService;