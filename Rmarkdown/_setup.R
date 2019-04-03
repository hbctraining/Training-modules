library(bcbioRNASeq)
library(DESeq2)
library(DEGreport)

library(knitr)
library(tidyverse)

# Set seed for reproducibility
set.seed(1454944673L)

opts_chunk[["set"]](
    autodep = TRUE,
    bootstrap.show.code = FALSE,
    cache = TRUE,
    cache.lazy = TRUE,
    dev = c("png", "pdf"),
    error = TRUE,
    fig.height = 10L,
    fig.retina = 2L,
    fig.width = 10L,
    highlight = TRUE,
    message = FALSE,
    prompt = TRUE,
    tidy = FALSE,
    warning = FALSE
)

theme_set(
    theme_paperwhite(
        base_size = 14L,
        legend_position = "bottom"
    )
)
