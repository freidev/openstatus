import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@openstatus/ui";

import type { StatusDotProps } from "./status-dot";
import { StatusDot } from "./status-dot";

export interface StatusDotWithTooltipProps extends StatusDotProps {}

export function StatusDotWithTooltip({
  status,
  active,
}: StatusDotWithTooltipProps) {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger>
          <StatusDot {...{ status, active }} />
        </TooltipTrigger>
        <TooltipContent>
          {active
            ? status === "active"
              ? "Monitor is active"
              : "Monitor has failed"
            : "Monitor is inactive"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
