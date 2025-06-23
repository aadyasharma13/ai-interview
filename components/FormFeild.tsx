import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface FormFeildProps<T extends FieldValues = FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
}

const FormFeild = <T extends FieldValues = FieldValues>({ form, name }: FormFeildProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }: { field: any }) => (
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormFeild;