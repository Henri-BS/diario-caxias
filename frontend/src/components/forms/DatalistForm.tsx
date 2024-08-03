import axios from "axios";
import { useState, useEffect } from "react";
import { CategoryPage } from "types/category";
import { BASE_URL } from "utils/requests";

export function CategoryDatalist() {
    const [categoryPage, setcategoryPage] = useState<CategoryPage>({ content: [], number: 0 })
    const [value, setValue] = useState("");

    useEffect(() => {
        axios.get(`${BASE_URL}/category/list?name=${value}`)
            .then(response => {
                setcategoryPage(response.data);
            });
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <div className="form-group">
            <label htmlFor="categoryName">Categoria: </label>
            <input
                id="categoryName"
                list="categoryList"
                value={value}
                onChange={handleChange}
                className="form-control"
                placeholder="busque categoria"
            />
            <datalist id="categoryList" >
                {categoryPage.content?.filter((category) =>
                    category.name.toLowerCase().includes(value.toLocaleLowerCase()))
                    .map((category) => (
                        <option id="value" key={category.id} value={category.name} >
                            {category.name}
                        </option>
                    ))}
            </datalist>
        </div>
    );
}