import styles from '../styles/UserTesting.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserTesting() {
    const [formData, setFormData] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });   // or 'smooth' if you prefer
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (submitted) {
            navigate("/")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Survey Submitted:', formData);

        try {
            const response = await fetch('https://thebiaseffect.net/survey/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('✅ Survey successfully submitted');
                setSubmitted(true);
            } else {
                console.error('❌ Server error while submitting survey');
            }
        } catch (err) {
            console.error('❌ Network error:', err);
        }
    };


    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form} >
                <h1>User Testing Survey</h1>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>What is your name?</label>
                    <textarea name="name" onChange={handleChange} className={styles.formTextArea} rows={1} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>1.1 What was your initial reaction when you saw how the AI classified your face?</label>
                    <textarea name="reaction" onChange={handleChange} className={styles.formTextArea} rows={3} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>2.1 Do you think this tool effectively shows how facial recognition AI is used by governments and corporations?</label>
                    <select name="representation" onChange={handleChange} className={styles.formSelect}>
                        <option value="">Select an option</option>
                        <option value="veryClearly">Yes, very clearly</option>
                        <option value="somewhat">Somewhat</option>
                        <option value="notReally">Not really</option>
                        <option value="notAtAll">Not at all</option>
                    </select>
                    <textarea name="representationComment" placeholder="Optional comments..." onChange={handleChange} className={styles.formTextArea} rows={2} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>2.2 Did anything surprise you about how the AI classified your identity?</label>
                    <textarea name="surprise" onChange={handleChange} className={styles.formTextArea} rows={3} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>3.1 Has this changed the way you think about how your face or data might be used online?</label>
                    <select name="changedThinking" onChange={handleChange} className={styles.formSelect}>
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="unsure">I’m not sure</option>
                    </select>
                    <textarea name="changedThinkingComment" placeholder="Optional comments..." onChange={handleChange} className={styles.formTextArea} rows={2} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>4.1 If you had to give 3–5 keywords that describe this project, what would they be?</label>
                    <textarea name="keywords" onChange={handleChange} className={styles.formTextArea} rows={2} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>4.2 What would you title this project, if it were up to you? </label>
                    <input type="text" name="altTitle" onChange={handleChange} className={styles.formTextArea} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>5.1 Was anything confusing or hard to understand?</label>
                    <textarea name="confusing" onChange={handleChange} className={styles.formTextArea} rows={3} />
                </div>

                <div className={styles.formSection}>
                    <label className={styles.questionLabel}>5.2 Anything you’d add, change, or improve?</label>
                    <textarea name="improvements" onChange={handleChange} className={styles.formTextArea} rows={3} />
                </div>
                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    )
}