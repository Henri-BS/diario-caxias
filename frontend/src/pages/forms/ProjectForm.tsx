import { useNotification, FieldError } from "components/shared/Notification";
import { TextInput, Textarea, Button, Label, Breadcrumb } from "flowbite-react";
import { useFormik } from "formik";
import { FaFolderClosed, FaHouse, FaTag, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "resources/auth";
import { Project } from "resources/project";
import * as Yup from "yup";
import { Login } from "./UserForm";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useEffect, useState } from "react";
import { Props } from "resources";
import { CategoryPage } from "resources/category";

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

    const { values, handleChange, errors, resetForm } = useFormik<Project>({
        initialValues: {
            projectTitle: "",
            projectDescription: "",
            projectImage: "",
            userId: 0
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const project: Project = { projectTitle: values.projectTitle, projectDescription: values.projectDescription, projectImage: values.projectImage, userId: userId }
        try {
            axios.post(`${baseUrl}/projects/save`, project)
                .then((response) => {
                    navigate(`/projetos/${project.id}`)
                    return response.status;
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
                <div>
                    <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                        <Breadcrumb.Item icon={FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/projetos">
                                Projetos
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/projetos/adicionar">
                                Adicionar Projeto
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                            <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Adicionar Projeto </span>
                            <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                        </div>
                        <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                            <div>
                                <TextInput type="hidden"
                                    id="userId"
                                    onChange={handleChange}
                                    value={userId}
                                />
                            </div>
                            <div >
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
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                                <Textarea
                                    color="bg-zinc-400"
                                    id="projectDescription"
                                    onChange={handleChange}
                                    value={values.projectDescription}
                                />
                                <FieldError error={errors.projectDescription} />
                            </div>
                            <div className="mt-5 grid grid-cols-1">
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url da Imagem: " />
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

    const { values, handleChange } = useFormik<Project>({
        initialValues: {
            id: projectId,
            projectTitle: project?.projectTitle,
            projectDescription: project?.projectDescription,
            projectDetails: project?.projectDetails,
            projectImage: project?.projectImage,
            userId: userId
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const projectValues: Project = {
            id: projectId,
            projectTitle: values.projectTitle ?? project?.projectTitle,
            projectDescription: values.projectDescription ?? project?.projectDescription,
            projectDetails: values.projectDetails ?? project?.projectDetails,
            projectImage: values.projectImage ?? project?.projectImage,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/projects/update`, projectValues)
                .then((response) => {
                    navigate(0);
                    return response.status;
                });
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }
    return (
        <div>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Editar Projeto </span>
                        <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300 text-2xl" />
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
                                defaultValue={project?.projectTitle}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectImage"
                                onChange={handleChange}
                                value={values.projectImage}
                                defaultValue={project?.projectImage}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                className="h-[200px]"
                                color="bg-zinc-400"
                                id="projectDescription"
                                onChange={handleChange}
                                value={values.projectDescription}
                                defaultValue={project?.projectDescription}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Informação Geral: *" />
                            <Textarea
                                className="h-[200px]"
                                color="bg-zinc-400"
                                id="projectDetails"
                                onChange={handleChange}
                                value={values.projectDetails}
                                defaultValue={project?.projectDetails}
                            />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

const projectCategoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string()
        .trim()
        .required("Selecionae uma categoria para adicionar!"),
});


export function ProjectCategoryAddForm({ params: projectId }: Props) {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;

    const query = "";
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/categories?size=100`)
            .then((response) => {
                setCategoryPage(response.data);
            })
    }, []);

    type ProjectCategory = {
        categoryName?: string;
        projectId?: number;
        userId?: number;
    }

    const { values, handleChange, errors, resetForm } = useFormik<ProjectCategory>({
        initialValues: {
            categoryName: "",
            projectId: 0,
            userId: 0
        },
        validationSchema: projectCategoryValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const projectCategory: ProjectCategory = { categoryName: values.categoryName, projectId: projectId, userId: userId }

        try {
            axios.post(`${baseUrl}/project-category/save`, projectCategory)
                .then((response) => {
                    return response.status;
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
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-full md:w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaTag /> Adicionar Categoria </span>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-full md:w-2/3">
                        <div>
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                            <TextInput type="hidden"
                                id="projectId"
                                onChange={handleChange}
                                value={projectId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Categoria: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="categoryName"
                                list="categoryList"
                                onChange={handleChange}
                                value={values.categoryName}
                            />
                            <datalist id="categoryList">
                                {categoryPage.content?.filter((category) =>
                                    category.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()))
                                    .map((category) =>
                                        <>
                                            <option id="query" key={category.id} value={category.categoryName}>
                                                {category.categoryName}
                                            </option>
                                        </>
                                    )
                                }
                            </datalist>
                            <FieldError error={errors.categoryName}/>
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