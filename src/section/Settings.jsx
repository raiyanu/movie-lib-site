import { useContext } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MovieContext } from "@/utils/MovieContextProvider";
export default function Settings() {
    const { doClearAwayMovieDB } = useContext(MovieContext);
    return (
        <div>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
                Settings
            </h2>
            <div className="my-6 w-full overflow-y-auto">
                <table className="mx-auto w-full max-w-screen-md">
                    <thead>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                            <th
                                className="grid-col-[0_/span_2] border bg-red-400 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                                colspan="100"
                            >
                                Account Option
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                Remove all Favorites
                            </td>
                            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                <DialogCloseButton actions={doClearAwayMovieDB}>
                                    Clear
                                </DialogCloseButton>
                            </td>
                        </tr>
                        <tr className="m-0 border-t p-0 even:bg-muted">
                            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                Clear Everything
                            </td>
                            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                                <DialogCloseButton>Clear</DialogCloseButton>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
            <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
        </div>
    );
}

export function DialogCloseButton({ children, actions }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle> Are you sure?</DialogTitle>
                    <DialogDescription>{/* Are you sure? */}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={actions}>
                            Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
