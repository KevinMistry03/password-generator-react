import React, { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { MdContentCopy } from "react-icons/md";


const PasswordGen = () => {

    const [GeneratedPassword, setGeneratedPassword] = useState('');
    const [CopyText, setCopyText] = useState('');
    const [Passwordstatus, setPasswordstatus] = useState('');
    const [PasswordLength, setPasswordLength] = useState(4);
    const [progressBarWidth, setProgressBarWidth] = useState('75%');
    const [Checkboxvalue, setCheckboxvalue] = useState([
        { text: 'Uppercase Letters', state: true },
        { text: 'Lowercase Letters', state: false },
        { text: 'Numbers', state: false },
        { text: 'Symbols', state: false }
    ]);

    const handleOptionChange = (index) => {
        const UpdateState = [...Checkboxvalue];
        UpdateState[index].state = !UpdateState[index].state
        setCheckboxvalue(UpdateState);
    }


    const clickToCopy = () => {
        navigator.clipboard.writeText(GeneratedPassword);
        setCopyText('Text Copied');

        setTimeout(() => {
            setCopyText('Copy');
        }, 3000);
    }

    const genRandomPassword = () => {
        let Caracter = ''
        let AllSmallCaracter = ''

        const selectedOption = Checkboxvalue.filter((checkbox) => checkbox.state);

        if (selectedOption.length === 0) {
            return;
        }


        selectedOption.forEach((option) => {
            if (option.text === 'Uppercase Letters') {
                Caracter += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            }
            else if (option.text === 'Lowercase Letters') {
                Caracter += 'abcdefghijklmnopqrstuvwxyz'
            }
            else if (option.text === 'Numbers') {
                Caracter += '0123456789'
            }
            else if (option.text === 'Symbols') {
                Caracter += '!@#$%^&*_+'
            }
        });
        for (let index = 0; index < PasswordLength; index++) {
            const randomNum = Math.floor(Math.random() * Caracter.length);
            AllSmallCaracter += Caracter[randomNum];
        }
        setGeneratedPassword(AllSmallCaracter);
    }

    useEffect(() => {
        genRandomPassword();
    }, [PasswordLength, Checkboxvalue]);

    useEffect(() => {
        if (PasswordLength < 6) {
            setPasswordstatus('Password is poor');
            setProgressBarWidth('25%');
        } else if (PasswordLength < 12) {
            setPasswordstatus('Password is medium');
            setProgressBarWidth('50%');
        } else if (PasswordLength < 50) {
            setPasswordstatus('Password is strong');
            setProgressBarWidth('100%');
        }
    }, [PasswordLength]);



    return (
        <>
            <div className="bg-dark text-secondary px-4 py-5 text-center">
                <div className="py-5">
                    <h1 className="display-5 fw-bold text-white">
                        Instantly generate a secure <br /> random password with the <br /> LastPass online tool
                    </h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="fs-5 mb-1">
                            Go beyond online generators with LastPass Premium. No matter what device or app you’re using, all your passwords are automatically generated, saved and synced – wherever you go.
                        </p>
                        <div
                            className="modal modal-sheet position-static d-block"
                            tabIndex={-1}
                            role="dialog"
                            id="modalChoice"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content rounded-3 shadow">
                                    <div className="modal-body p-4 text-center">
                                        <h1 className="mb-0 text-dark">{GeneratedPassword}</h1>
                                        <p className="mb-0">
                                            <button className="btn btn-dark mt-4 me-2" onClick={genRandomPassword}>
                                                <FiRefreshCcw />
                                            </button>
                                            <button className="btn btn-outline-secondary mt-4" onClick={clickToCopy}>
                                                <MdContentCopy />
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container my-5">
                            <div className="p-5 text-center bg-body-tertiary rounded-3">
                                <h1 className="text-body-emphasis"><b>Customize your password</b></h1>
                                <hr />
                                <div className="row mb-3 text-center">
                                    <div className="col-sm-6 col-lg-8 themed-grid-col">
                                        <p className="lead">
                                            <label htmlFor="passwordLength" className="form-label">
                                                Password Length: {PasswordLength}
                                            </label>
                                            <input
                                                type="range"
                                                value={PasswordLength}
                                                onChange={(e) => setPasswordLength(e.target.value)}
                                                min="4"
                                                max="50"
                                                className="form-range"
                                                id="passwordLength"
                                            />
                                        </p>
                                        <div
                                            className="progress"
                                            role="progressbar"
                                            aria-label="Warning example"
                                            aria-valuenow={75}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div className={`progress-bar ${PasswordLength < 6 ? 'text-bg-danger' :
                                                PasswordLength < 12 ? 'text-bg-warning' :
                                                    PasswordLength < 50 ? 'text-bg-success' :
                                                        'text-bg-warning'}`} style={{ width: progressBarWidth }}>
                                                {PasswordLength}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-4 themed-grid-col">
                                        <div className="checkbox text-start">
                                            <div className="form-check">
                                                {Checkboxvalue.map((checkbox, i) => (
                                                    <div key={i} className="form-check" style={{ marginBottom: '10px' }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`checkbox-${i}`}
                                                            checked={checkbox.state}
                                                            onChange={() => handleOptionChange(i)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`checkbox-${i}`}>
                                                            {checkbox.text}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default PasswordGen;
