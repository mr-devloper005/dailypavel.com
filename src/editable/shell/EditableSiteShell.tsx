import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { EditablePageMotion } from '@/editable/shell/EditablePageMotion'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    // suppressHydrationWarning: the dark theme attracts DOM-mutating browser
    // extensions (Dark Reader, Grammarly, etc.) that inject attributes on this
    // top-level wrapper before React hydrates. The wrapper's own markup is fully
    // deterministic, so suppressing here only quiets extension-induced noise.
    <div suppressHydrationWarning className={`editable-site-root ${dc.shell.page} flex min-h-screen flex-col ${className}`}>
      <EditableNavbar />
      <EditablePageMotion>{children}</EditablePageMotion>
      <EditableFooter />
    </div>
  )
}
