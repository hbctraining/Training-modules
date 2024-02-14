#!/usr/bin/env runhaskell
{-# LANGUAGE OverloadedStrings #-}
import Text.Pandoc.JSON
import Data.Text

latex::Format
latex = Format "latex"

highlight :: Block -> IO Block
highlight cb@(Div (id, (cls:_), _) (contents:_)) =
   case (unpack cls) of "warn" -> return $ Div ("", [], []) ((RawBlock latex "\\begin{tcolorbox}[colframe=yellow!90!white, colback=yellow!20!white]Warning: ") : contents : (RawBlock latex "\\end{tcolorbox}") : [])
                        "tips" -> return $ Div ("", [], []) ((RawBlock latex "\\begin{tcolorbox}[colframe=blue!20!white, colback=blue!10!white]Tips: ") : contents : (RawBlock latex "\\end{tcolorbox}") : [])
                        _ -> return cb

highlight x = return x

main :: IO ()
main = toJSONFilter highlight
