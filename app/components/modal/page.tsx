"use client"

import { useState } from "react"
import { toast } from "@/registry/new-york/ui/toast/toast"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  ModalIcon,
} from "@/registry/new-york/ui/modal/modal"
import {
  Input,
  InputField,
  InputLabel,
} from "@/registry/new-york/ui/input/input"
import {
  Textarea,
  TextareaField,
  TextareaLabel,
} from "@/registry/new-york/ui/textarea/textarea"
import { Button } from "@/registry/new-york/ui/button/button"
import {
  Copy,
  ExternalLink,
  Trash2,
  CircleAlert,
  CircleCheck,
  TriangleAlert,
  Info,
} from "lucide-react"
import { ComponentPreview } from "@/app/_components/component-preview"
import { DosDonts, type DosDontsItem } from "@/app/_components/dos-donts"
import { PropsTable, type PropDef } from "@/app/_components/props-table"
import {
  TableOfContents,
  type TocSection,
} from "@/app/_components/table-of-contents"
import { CodeBlock } from "@/app/_components/code-block"

/* ----------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------- */

const overviewSections: TocSection[] = [
  { id: "confirmation", label: "Confirmation" },
  { id: "variants", label: "Variants" },
  { id: "with-input", label: "With Input" },
  { id: "invitation", label: "Invitation" },
  { id: "controlled", label: "Controlled" },
]

const docSections: TocSection[] = [
  { id: "dos-donts", label: "Do / Don't" },
]

const dosDontsItems: DosDontsItem[] = [
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <ModalClose asChild>
            <Button variant="secondary" size="sm">Cancel</Button>
          </ModalClose>
          <Button size="sm">Confirm</Button>
        </div>
      ),
      description:
        "Use ModalClose asChild on Cancel buttons to automatically close the dialog.",
    },
    dont: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-sm)]">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button size="sm">Confirm</Button>
        </div>
      ),
      description:
        "Don't add manual onClick={() => setOpen(false)} on Cancel when ModalClose handles it.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex items-center gap-[var(--layout-gap-md)]">
          <ModalIcon variant="destructive"><Trash2 /></ModalIcon>
          <ModalIcon variant="success"><CircleCheck /></ModalIcon>
          <ModalIcon variant="warning"><TriangleAlert /></ModalIcon>
        </div>
      ),
      description:
        "Use ModalIcon with a semantic variant for colored icon circles.",
    },
    dont: {
      preview: (
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{ background: "#fee2e2" }}
        >
          <Trash2 size={18} style={{ color: "#ef4444" }} />
        </div>
      ),
      description:
        "Don't hardcode background colors for icon backgrounds — use ModalIcon variants.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)]">
          <ModalTitle>Delete project</ModalTitle>
          <ModalDescription>This action cannot be undone.</ModalDescription>
        </div>
      ),
      description:
        "Use ModalTitle for accessible dialog labeling (provides aria-labelledby).",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)]">
          <p className="text-content-body font-accent" style={{ color: "var(--text-base-strong)" }}>Delete project</p>
          <p className="text-content-caption" style={{ color: "var(--text-base-moderate)" }}>This action cannot be undone.</p>
        </div>
      ),
      description:
        "Don't use a plain <p> for the modal title — screen readers won't announce it.",
    },
  },
  {
    do: {
      preview: (
        <Button variant="destructive" size="sm">
          <Trash2 /> Delete project
        </Button>
      ),
      description:
        "Use onInteractOutside with preventDefault for destructive actions to prevent accidental dismiss.",
    },
    dont: {
      preview: (
        <Button variant="secondary" size="sm">
          <Trash2 /> Delete project
        </Button>
      ),
      description:
        "Don't remove the overlay entirely to prevent dismiss — use onInteractOutside instead.",
    },
  },
  {
    do: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="h-5 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "80%" }} />
          <div className="h-8 rounded" style={{ background: "var(--background-neutral-faint-default)", border: "var(--layout-border-thin) solid var(--border-default)" }} />
          <div className="flex justify-end gap-[var(--layout-gap-xs)]">
            <Button variant="secondary" size="xs">Cancel</Button>
            <Button size="xs">Save</Button>
          </div>
        </div>
      ),
      description:
        "Compose parts freely — mix ModalHeader, ModalBody, ModalFooter for flexible layouts.",
    },
    dont: {
      preview: (
        <div className="flex flex-col gap-[var(--layout-gap-xs)] w-full max-w-[200px]">
          <div className="h-5 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "80%" }} />
          <div className="h-5 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "60%" }} />
          <div className="h-5 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "70%" }} />
          <div className="h-5 rounded" style={{ background: "var(--background-neutral-moderate-default)", width: "50%" }} />
        </div>
      ),
      description:
        "Don't force all modals into a single rigid layout.",
    },
  },
]

const contentPropDefs: PropDef[] = [
  {
    name: "size",
    type: ["sm", "md", "lg"],
    default: "md",
    description: "Content max-width: 320px / 400px / 560px.",
  },
  {
    name: "onInteractOutside",
    type: ["(e: Event) => void"],
    description:
      "Callback on outside click. Call e.preventDefault() to block dismiss.",
  },
  {
    name: "className",
    type: ["string"],
    description: "Additional class names merged via cn().",
  },
]

const titlePropDefs: PropDef[] = [
  {
    name: "className",
    type: ["string"],
    description:
      'Override classes. Default: text-content-body font-accent.',
  },
  {
    name: "children",
    type: ["ReactNode"],
    required: true,
    description: "Title text. Provides aria-labelledby for the dialog.",
  },
]

const iconPropDefs: PropDef[] = [
  {
    name: "variant",
    type: ["brand", "destructive", "success", "warning"],
    default: "brand",
    description: "Semantic color for the icon circle background and icon color.",
  },
  {
    name: "children",
    type: ["ReactNode"],
    description: "Icon element (e.g. a lucide-react icon).",
  },
]

const closePropDefs: PropDef[] = [
  {
    name: "asChild",
    type: ["boolean"],
    default: "false",
    description: "Merge props onto child element (e.g. a Cancel button).",
  },
  {
    name: "children",
    type: ["ReactNode"],
    description: "Custom close element. Defaults to X icon if omitted.",
  },
]

/* ----------------------------------------------------------------
 * Helper: confirmation modal pattern
 * ---------------------------------------------------------------- */

function ConfirmationModal({
  variant,
  icon,
  title,
  description,
  actionLabel = "Confirm",
  triggerLabel,
  actionVariant = "primary",
}: {
  variant: "brand" | "destructive" | "success" | "warning"
  icon: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  triggerLabel: string
  actionVariant?: "primary" | "destructive"
}) {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary" size="sm">
          {triggerLabel}
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
          <ModalIcon variant={variant}>{icon}</ModalIcon>
          <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
            <ModalTitle>{title}</ModalTitle>
            <ModalDescription>{description}</ModalDescription>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant={actionVariant} size="sm">
              {actionLabel}
            </Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

/* ----------------------------------------------------------------
 * Invitation modal with view switching
 * ---------------------------------------------------------------- */

function InvitationModal() {
  const [view, setView] = useState<"link" | "email">("link")

  return (
    <Modal onOpenChange={() => setView("link")}>
      <ModalTrigger asChild>
        <Button variant="secondary" size="sm">
          Invite members
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle className="[font-size:var(--font-size-content-note)] [line-height:var(--font-line-height-content-note)]">
            Invite to your workspace
          </ModalTitle>
          <ModalClose />
        </ModalHeader>
        {view === "link" ? (
          <div key="link" className="modal-view-enter w-full">
            <ModalBody>
              <InputField>
                <InputLabel>Invite link</InputLabel>
                <Input
                  size="sm"
                  defaultValue="https://app.getlyse.com/join/abc123"
                  trailing={
                    <button
                      type="button"
                      className="cursor-pointer [color:var(--text-base-moderate)]"
                      aria-label="Copy invite link"
                      onClick={() => toast.success("Link copied!")}
                    >
                      <Copy className="size-[var(--layout-size-xs)]" />
                    </button>
                  }
                />
              </InputField>
              <Button
                variant="terciary"
                className="w-full"
                size="sm"
                onClick={() => setView("email")}
              >
                Invite with email
              </Button>
            </ModalBody>
          </div>
        ) : (
          <div key="email" className="modal-view-enter w-full">
            <ModalBody>
              <TextareaField>
                <TextareaLabel>Email</TextareaLabel>
                <Textarea
                  size="md"
                  placeholder="email@example.com, email@example.com"
                />
              </TextareaField>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button
                variant="terciary"
                size="sm"
                onClick={() => setView("link")}
              >
                Invite with link
              </Button>
              <Button size="sm">Send invites</Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  )
}

/* ----------------------------------------------------------------
 * Tabs
 * ---------------------------------------------------------------- */

function OverviewTab() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <ComponentPreview
        id="confirmation"
        title="Confirmation"
        description="Modal with icon, title, description, and action buttons."
      >
        <ConfirmationModal
          variant="brand"
          icon={<Info />}
          title="Token is synchronized"
          description="Are you sure you want to update the token? This will affect all dependent components."
          triggerLabel="Open modal"
        />
      </ComponentPreview>

      <ComponentPreview
        id="variants"
        title="Variants"
        description="Semantic icon colors: brand, destructive, success, or warning."
      >
        <div className="flex flex-wrap gap-3">
          <ConfirmationModal
            variant="brand"
            icon={<Info />}
            title="Token is synchronized"
            description="Are you sure you want to update the token? This will affect all dependent components."
            triggerLabel="Brand"
          />
          <ConfirmationModal
            variant="destructive"
            icon={<CircleAlert />}
            title='Delete "Lyse"'
            description="Are you sure you want to delete your Lyse account? This action cannot be undone."
            triggerLabel="Destructive"
            actionLabel="Delete"
            actionVariant="destructive"
          />
          <ConfirmationModal
            variant="success"
            icon={<CircleCheck />}
            title="Action completed successfully"
            description="The operation was a success! No additional steps are needed."
            triggerLabel="Success"
          />
          <ConfirmationModal
            variant="warning"
            icon={<TriangleAlert />}
            title="Proceed with caution"
            description="Are you sure you want to proceed? This action might have unintended consequences."
            triggerLabel="Warning"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        id="with-input"
        title="With Input"
        description="Custom content like a confirmation input inside the modal body."
      >
        <Modal>
          <ModalTrigger asChild>
            <Button variant="secondary" size="sm">
              Delete project
            </Button>
          </ModalTrigger>
          <ModalContent>
            <ModalBody className="gap-[var(--layout-gap-lg)]">
              <div className="flex flex-row gap-[var(--layout-gap-md)]">
                <ModalIcon variant="destructive">
                  <Trash2 />
                </ModalIcon>
                <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
                  <ModalTitle>Delete &quot;Lyse&quot;</ModalTitle>
                  <ModalDescription>
                    Are you sure you want to delete your Lyse account? This action
                    cannot be undone.
                  </ModalDescription>
                </div>
              </div>
              <InputField>
                <InputLabel required>
                  Type &quot;delete&quot; to confirm the removal
                </InputLabel>
                <Input size="sm" placeholder="delete" />
              </InputField>
            </ModalBody>
            <ModalFooter>
              <ModalClose asChild>
                <Button variant="secondary" size="sm">
                  Cancel
                </Button>
              </ModalClose>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ComponentPreview>

      <ComponentPreview
        id="invitation"
        title="Invitation"
        description="Header bar with close button, switching between link and email views."
      >
        <InvitationModal />
      </ComponentPreview>

      <ComponentPreview
        id="controlled"
        title="Controlled"
        description="Open and close the modal programmatically."
      >
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setOpen(true)}
          >
            Open controlled modal
          </Button>
          <Modal open={open} onOpenChange={setOpen}>
            <ModalContent>
              <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
                <ModalIcon variant="success">
                  <CircleCheck />
                </ModalIcon>
                <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
                  <ModalTitle>Action completed</ModalTitle>
                  <ModalDescription>
                    The operation was successful.
                  </ModalDescription>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Done
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </ComponentPreview>
    </div>
  )
}

function DocumentationTab() {
  return (
    <div className="flex flex-col gap-12">
      <DosDonts id="dos-donts" items={dosDontsItems} />
    </div>
  )
}

/* ----------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------- */

type Tab = "overview" | "props" | "documentation"

export default function ModalPage() {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <>
      <main className="flex-1 min-w-0 py-16 flex flex-col gap-10 max-w-none px-8 lg:px-16 xl:px-20">
        {/* Hero */}
        <div className="flex flex-col gap-3">
          <h1
            className="font-bold"
            style={{ color: "var(--text-base-strong)", fontSize: "var(--root-font-size-5xl)" }}
          >
            Modal
          </h1>
          <p
            className="text-content-highlight"
            style={{ color: "var(--text-base-moderate)" }}
          >
            The Modal component is an overlay dialog that focuses the
            user&apos;s attention on a specific task or decision. It provides a
            structured space for confirmations, alerts, forms, or any
            interaction that requires focused input.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                navigator.clipboard
                  .writeText("npx shadcn@latest add https://lyse-registry.vercel.app/r/modal.json")
                  .then(() => toast.success("Copied to clipboard"))
                  .catch(() => {})
              }}
            >
              <><Copy className="size-[var(--layout-size-xs)]" /> Copy install command</>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a
                href="https://v0.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to v0.dev <ExternalLink />
              </a>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-10">
          <div
            className="flex items-center gap-1 pb-px"
            style={{
              borderBottom:
                "var(--layout-border-thin) solid var(--border-default)",
            }}
          >
            {(
              [
                { key: "overview" as Tab, label: "Overview" },
                { key: "props" as Tab, label: "Props" },
                { key: "documentation" as Tab, label: "Best practices" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="text-content-note font-accent px-4 py-2 -mb-px transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                style={{
                  color:
                    tab === t.key
                      ? "var(--text-base-strong)"
                      : "var(--text-base-moderate)",
                  borderBottom:
                    tab === t.key
                      ? "2px solid var(--text-base-strong)"
                      : "2px solid transparent",
                  transition: "color 150ms ease, border-color 150ms ease",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Code example */}
          {tab === "overview" && (
            <CodeBlock
              preview={
                <Modal>
                  <ModalTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Open modal
                    </Button>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalBody className="flex-row gap-[var(--layout-gap-md)]">
                      <ModalIcon variant="brand">
                        <Info />
                      </ModalIcon>
                      <div className="flex flex-1 flex-col gap-[var(--layout-gap-sm)] min-w-0">
                        <ModalTitle>Confirm action</ModalTitle>
                        <ModalDescription>
                          Are you sure you want to proceed?
                        </ModalDescription>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <ModalClose asChild>
                        <Button variant="secondary" size="sm">
                          Cancel
                        </Button>
                      </ModalClose>
                      <ModalClose asChild>
                        <Button variant="primary" size="sm">
                          Confirm
                        </Button>
                      </ModalClose>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              }
              code={
                <>
                  <span style={{ color: "var(--root-color-brand-300)" }}>import</span>
                  {" { "}
                  <span style={{ color: "var(--root-color-success-400)" }}>
                    Modal, ModalTrigger,{"\n"}
                    {"  "}ModalContent, ModalBody,{"\n"}
                    {"  "}ModalTitle, ModalDescription,{"\n"}
                    {"  "}ModalFooter, ModalClose, ModalIcon
                  </span>
                  {" } "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>from</span>{" "}
                  <span style={{ color: "var(--root-color-warning-400)" }}>
                    {`'@/components/ui/modal'`}
                  </span>
                  {"\n\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Modal</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalTrigger</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>asChild</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  {"..."}
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalTrigger</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalBody</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n      "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalIcon</span>
                  {" "}
                  <span style={{ color: "var(--root-color-brand-300)" }}>variant</span>
                  {"="}
                  <span style={{ color: "var(--root-color-warning-400)" }}>{`"brand"`}</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"..."}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalIcon</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n      "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalTitle</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"..."}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalTitle</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalBody</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"<"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalFooter</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n      "}
                  {"...buttons"}
                  {"\n    "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalFooter</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n  "}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>ModalContent</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                  {"\n"}
                  <span style={{ color: "var(--root-color-brand-400)" }}>{"</"}</span>
                  <span style={{ color: "var(--root-color-success-400)" }}>Modal</span>
                  <span style={{ color: "var(--root-color-brand-400)" }}>{">"}</span>
                </>
              }
            />
          )}

          {/* Tab content */}
          {tab === "overview" ? (
            <OverviewTab />
          ) : tab === "props" ? (
            <div className="flex flex-col gap-12">
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  ModalContent
                </h3>
                <PropsTable
                  propDefs={contentPropDefs}
                  extendsType="Radix Dialog.ContentProps"
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  ModalTitle
                </h3>
                <PropsTable
                  propDefs={titlePropDefs}
                  extendsType="Radix Dialog.TitleProps"
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  ModalIcon
                </h3>
                <PropsTable
                  propDefs={iconPropDefs}
                  extendsType='React.ComponentProps<"div">'
                />
              </div>
              <div>
                <h3
                  className="text-heading-small mb-4"
                  style={{ color: "var(--text-base-strong)" }}
                >
                  ModalClose
                </h3>
                <PropsTable
                  propDefs={closePropDefs}
                  extendsType="Radix Dialog.CloseProps"
                />
              </div>
            </div>
          ) : (
            <DocumentationTab />
          )}
        </div>
      </main>

      <TableOfContents
        sections={
          tab === "overview"
            ? overviewSections
            : tab === "documentation"
              ? docSections
              : []
        }
      />
    </>
  )
}
