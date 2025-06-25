import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormFeildProps<T extends FieldValues = FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type: string;
}

const FormFeild = <T extends FieldValues = FieldValues>({ control, name, label, placeholder, type }: FormFeildProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFeild;