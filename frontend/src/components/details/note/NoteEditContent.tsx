import React from "react";
import {Button, Form} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikActions, FormikProps} from "formik";
import styles from "./NoteEditContent.module.scss";
import * as Yup from 'yup';

interface Props {
    content?: string;
    onSave: (content: string) => Promise<any>;
}

interface FormValues {
    content: string;
}

const NoteEditContent: React.FunctionComponent<Props> = (props) => {
    const {content} = props;

    const validation = Yup.object().shape({
        content: Yup.string().max(255, "Too long")
    });

    return (
        <Formik initialValues={{content: content || ''}}
                onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
                    props.onSave(values.content).finally(() => {
                        actions.setSubmitting(false)
                    });
                }}
                validationSchema={validation}
                render={(props: FormikProps<FormValues>) => (
                    <Form onSubmit={props.handleSubmit} className={styles.form}>
                        <Field name={"content"}
                               render={({field, form}: FieldProps<FormValues>) => (
                                   <div className={styles.input}>
                                       <input type="text" {...field} placeholder="Type a note..." autoComplete={"off"} autoFocus={true}/>
                                       <div className={styles.error}>{form.touched.content && form.errors.content && form.errors.content}</div>
                                   </div>
                               )}
                        />
                        <Button type={"submit"} icon={"check"} disabled={props.isSubmitting}/>
                    </Form>
                )}
        />
    )
};

export default NoteEditContent;
