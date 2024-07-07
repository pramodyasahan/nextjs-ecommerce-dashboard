"use client"

import {DropdownMenuItem} from "@/components/ui/dropdown-menu"
import {useTransition} from "react"
import {deleteProduct, toggleProductAvailability} from "../../_actions/products"
import {useRouter} from "next/navigation"
import {MdDelete} from "react-icons/md"
import {GiSightDisabled} from "react-icons/gi"
import {FaEye} from "react-icons/fa";

export function ActiveToggleDropdownItem({id, isAvailableForPurchase,}: {
    id: string,
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem className="flex justify-evenly"
                          disabled={isPending}
                          onClick={() => {
                              startTransition(async () => {
                                  await toggleProductAvailability(id, !isAvailableForPurchase)
                                  router.refresh()
                              })
                          }}>{isAvailableForPurchase ? <><GiSightDisabled/>Deactivate</> : <><FaEye
            className="mx-1"/>Activate</>}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({id, disabled,}: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem className="flex justify-normal"
                          variant="destructive"
                          disabled={disabled || isPending}
                          onClick={() => {
                              startTransition(async () => {
                                  await deleteProduct(id)
                                  router.refresh()
                              })
                          }}><MdDelete className="mx-2"/>Delete
        </DropdownMenuItem>
    )
}