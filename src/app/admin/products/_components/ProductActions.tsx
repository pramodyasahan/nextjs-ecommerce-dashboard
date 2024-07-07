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
        <DropdownMenuItem className="flex justify-items-start"
                          disabled={isPending}
                          onClick={() => {
                              startTransition(async () => {
                                  await toggleProductAvailability(id, !isAvailableForPurchase)
                                  router.refresh()
                              })
                          }}>{isAvailableForPurchase ? <><GiSightDisabled className="mr-3"/>Deactivate</> : <><FaEye
            className="mr-3"/>Activate</>}
        </DropdownMenuItem>
    )
}

export function DeleteDropdownItem({id, disabled,}: { id: string, disabled: boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <DropdownMenuItem className="flex justify-items-start"
                          variant="destructive"
                          disabled={disabled || isPending}
                          onClick={() => {
                              startTransition(async () => {
                                  await deleteProduct(id)
                                  router.refresh()
                              })
                          }}><MdDelete className="mr-3"/>Delete
        </DropdownMenuItem>
    )
}