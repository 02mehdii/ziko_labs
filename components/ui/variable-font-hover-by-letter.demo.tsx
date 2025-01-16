'use client'

import { VariableFontHoverByLetter } from "@/components/ui/variable-font-hover-by-letter"

function JobListingsExample() {
  return (
    <div className="w-full h-full rounded-lg sm:text-xl xs:text-sm md:text-2xl xl:text-3xl flex flex-col items-center justify-center font-overusedGrotesk">
      <div className="w-full justify-start items-center p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="w-3/4">
          <h2>OPEN ROLES ✽</h2>
          <ul className="flex flex-col space-y-1 mt-6 md:mt-12 h-full cursor-pointer">
            <VariableFontHoverByLetter
              label="DESIGN ENGINEER (US)"
              staggerDuration={0.03}
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
            />
            <VariableFontHoverByLetter
              label="PRODUCT DESIGNER (US/UK)"
              staggerDuration={0.0}
              transition={{ duration: 1, type: "spring" }}
              fromFontVariationSettings="'wght' 400, 'slnt' -10"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
            />
            <VariableFontHoverByLetter
              label="ENGINEERING MANAGER (US)"
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
              staggerFrom={"last"}
            />
            <VariableFontHoverByLetter
              label="SALES ENGINEER (US)"
              staggerFrom={"center"}
              fromFontVariationSettings="'wght' 400, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

function StaggerDirectionsExample() {
  return (
    <div className="space-y-6 p-8">
      <VariableFontHoverByLetter
        label="FROM FIRST LETTER"
        staggerFrom="first"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
      <VariableFontHoverByLetter
        label="FROM LAST LETTER"
        staggerFrom="last"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
      <VariableFontHoverByLetter
        label="FROM CENTER"
        staggerFrom="center"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
    </div>
  )
}

function TimingExample() {
  return (
    <div className="space-y-6 p-8">
      <VariableFontHoverByLetter
        label="QUICK TRANSITION"
        staggerDuration={0.01}
        transition={{ duration: 0.3, type: "spring" }}
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
      <VariableFontHoverByLetter
        label="SLOW TRANSITION"
        staggerDuration={0.05}
        transition={{ duration: 1.2, type: "spring" }}
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
    </div>
  )
}

function StyleVariationsExample() {
  return (
    <div className="space-y-6 p-8">
      <VariableFontHoverByLetter
        label="WEIGHT CHANGE"
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 900"
      />
      <VariableFontHoverByLetter
        label="WEIGHT AND SLANT"
        fromFontVariationSettings="'wght' 400, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
      />
    </div>
  )
}

export {
  JobListingsExample,
  StaggerDirectionsExample,
  TimingExample,
  StyleVariationsExample
}