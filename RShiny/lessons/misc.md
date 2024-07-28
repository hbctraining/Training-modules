This is a place to compile CSS documentation and style code.

h2("my Title", style = "font-size: 10px"),
tags$style(HTML(".js-irs-0 .irs-single, .js-irs-0 .irs-bar-edge, .js-irs-0 .irs-bar {background: orange}")),
tags$style(HTML(".js-irs-1 .irs-single, .js-irs-1 .irs-bar-edge, .js-irs-1 .irs-bar {background: orange}")),
sliderInput("slider_input_1", "Select a number", value = 5, min = 1, max = 10),
sliderInput("slider_input_2", "Select a number", value = 5, min = 1, max = 10),
actionButton("calculate", "Multiply!",
                style = "color: orange;
                         background-color: blue;
                         height: 50px;
                         width: 100px;
                         text-align:center;
                         border-radius: 100px;
                         border-width: 5px;
                         border-color: orange;
                         font-size: 24px;
                         font-weight: 800")
