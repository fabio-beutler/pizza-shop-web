import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface PaginationImpProps {
  pageIndex: number
  totalCount: number
  perPage: number
  siblingsCount?: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function PaginationBottom({
  pageIndex,
  totalCount,
  perPage,
  siblingsCount = 1,
  onPageChange,
}: PaginationImpProps) {
  const currentPage = pageIndex + 1
  const totalPages = Math.ceil(totalCount / perPage) || 1
  const lastPage = Math.floor(totalCount / perPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        {/* <div className="min-w-fit text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div> */}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirst
                disabled={pageIndex === 0}
                onClick={() => onPageChange(0)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                disabled={pageIndex === 0}
                onClick={() => onPageChange(pageIndex - 1)}
              />
            </PaginationItem>

            {currentPage > 2 + siblingsCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {previousPages.length > 0 &&
              previousPages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => onPageChange(page - 1)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>

            {nextPages.length > 0 &&
              nextPages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink onClick={() => onPageChange(page - 1)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {currentPage + 1 + siblingsCount < lastPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                disabled={totalPages <= pageIndex + 1}
                onClick={() => onPageChange(pageIndex + 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                disabled={totalPages <= pageIndex + 1}
                onClick={() => onPageChange(totalPages - 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
