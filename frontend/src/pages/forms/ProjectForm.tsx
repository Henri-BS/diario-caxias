import { useNotification, FieldError } from "components/shared/Notification";
import { TextInput, Textarea, Button, Label } from "flowbite-react";
import { useFormik } from "formik";
import { FaFolderClosed, FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "resources/auth";
import { Project } from "resources/project";
import * as Yup from "yup";
import { Login } from "./UserForm";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useEffect, useState } from "react";
import { Props } from "resources";

export interface ProjectFormProps {
    projectTitle: string;
    projectDescription: string;
    projectImage: string;
    userId: number;
}

export const projectFormSchema: ProjectFormProps = {
    projectTitle: "",
    projectDescription: "",
    projectImage: "",
    userId: 0,
};

export const projectValidationSchema = Yup.object().shape({
    projectTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    projectDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});

export function ProjectAddForm() {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
const navigate = useNavigate();

    const { values, handleChange, errors, resetForm } = useFormik<ProjectFormProps>({
        initialValues: projectFormSchema,
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const project: Project = { projectTitle: values.projectTitle, projectDescription: values.projectDescription, projectImage: values.projectImage, userId: userId }
        try {
            axios.post(`${baseUrl}/projects/save`, project)
                .then((response) => {
                    console.log(response.data);
                });
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Adicionar Projeto </span>
                        <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div className="grid grid-cols-1">
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Título: *</label>
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                onChange={handleChange}
                                value={values.projectTitle}
                            />
                            <FieldError error={errors.projectTitle} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Descrição: </label>
                            <Textarea
                                color="bg-zinc-400"
                                id="projectDescription"
                                onChange={handleChange}
                                value={values.projectDescription}
                            />
                            <FieldError error={errors.projectDescription} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="projectImage"
                                onChange={handleChange}
                                value={values.projectImage}
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}

export function ProjectEditForm({ params: projectId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${baseUrl}/projects/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);

    const { values, handleChange, errors } = useFormik<ProjectFormProps>({
        initialValues: projectFormSchema,
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const projectValues: Project = {
            id: projectId,
            projectTitle: values.projectTitle ?? project?.projectTitle,
            projectDescription: values.projectDescription ?? project?.projectDescription,
            projectImage: values.projectImage ?? project?.projectImage,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/projects/update`, projectValues)
                .then((response) => {
                    console.log(response.data);
                });
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }
    return (
        <>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Editar Projeto </span>
                        <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div>
                            <TextInput
                                type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                onChange={handleChange}
                                value={values.projectTitle}
                            />
                            <FieldError error={errors.projectTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectImage"
                                onChange={handleChange}
                                value={values.projectImage}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="projectDescription"
                                onChange={handleChange}
                                value={values.projectDescription}
                            />
                            <FieldError error={errors.projectDescription} />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}