import React from "react";
import {Button, Form} from "semantic-ui-react";
import {Field, FieldProps, Formik, FormikActions, FormikProps} from "formik";

interface Props {
    content?: string;
    onSave: (content: string) => Promise<any>;
}

interface FormValues {
    content: string;
}

const NoteEditContent: React.FunctionComponent<Props> = (props) => {
    const {content} = props;

    return (
        <Formik initialValues={{content: content || ''}}
                onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
                    props.onSave(values.content).finally(() => {
                        actions.setSubmitting(false)
                    });
                }}
                render={(props: FormikProps<FormValues>) => (
                    <Form onSubmit={props.handleSubmit}>
                        <Field name={"content"}
                               render={({field, form}: FieldProps<FormValues>) => (
                                   <div>
                                       <input type="text" {...field} placeholder="Type a note..." autoComplete={"off"}/>
                                       {form.touched.content && form.errors.content && form.errors.content}
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
