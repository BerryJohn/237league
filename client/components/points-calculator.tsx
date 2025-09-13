import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Chip } from '@heroui/chip';
import { Season, PointsSystem } from '@/types';

interface PointsCalculatorProps {
  pointsSystem: PointsSystem;
  seasonName?: string;
}

export const PointsCalculator = ({
  pointsSystem,
  seasonName,
}: PointsCalculatorProps) => {
  const [position, setPosition] = useState<string>('');
  const [fastestLap, setFastestLap] = useState<boolean>(false);
  const [polePosition, setPolePosition] = useState<boolean>(false);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);

  const calculatePoints = () => {
    const pos = parseInt(position);
    if (isNaN(pos) || pos < 1) {
      setCalculatedPoints(null);
      return;
    }

    // Find points for position
    const positionPoints =
      pointsSystem.positions.find((p) => p.position === pos)?.points || 0;

    // Add bonus points
    let bonusPoints = 0;
    if (fastestLap && pointsSystem.bonusPoints?.fastestLap) {
      bonusPoints += pointsSystem.bonusPoints.fastestLap;
    }
    if (polePosition && pointsSystem.bonusPoints?.polePosition) {
      bonusPoints += pointsSystem.bonusPoints.polePosition;
    }

    setCalculatedPoints(positionPoints + bonusPoints);
  };

  const reset = () => {
    setPosition('');
    setFastestLap(false);
    setPolePosition(false);
    setCalculatedPoints(null);
  };

  const maxPosition = Math.max(
    ...pointsSystem.positions.map((p) => p.position)
  );

  return (
    <Card>
      <CardHeader>
        <h3 className="font-bold text-lg">🧮 Points Calculator</h3>
        {seasonName && <p className="text-sm text-default-500">{seasonName}</p>}
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Position Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Finishing Position
            </label>
            <Input
              type="number"
              placeholder="Enter position (1-∞)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              min="1"
              size="sm"
            />
            <p className="text-xs text-default-500 mt-1">
              Points awarded for positions 1-{maxPosition}
            </p>
          </div>

          {/* Bonus Points */}
          {pointsSystem.bonusPoints && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Bonus Points
              </label>
              <div className="space-y-2">
                {pointsSystem.bonusPoints.fastestLap && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="fastestLap"
                      checked={fastestLap}
                      onChange={(e) => setFastestLap(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="fastestLap" className="text-sm">
                      Fastest Lap (+{pointsSystem.bonusPoints.fastestLap} pt)
                    </label>
                  </div>
                )}
                {pointsSystem.bonusPoints.polePosition && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="polePosition"
                      checked={polePosition}
                      onChange={(e) => setPolePosition(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="polePosition" className="text-sm">
                      Pole Position (+{pointsSystem.bonusPoints.polePosition}{' '}
                      pt)
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex gap-2">
            <Button
              color="primary"
              size="sm"
              onClick={calculatePoints}
              className="flex-1"
              disabled={!position}
            >
              Calculate Points
            </Button>
            <Button variant="flat" size="sm" onClick={reset}>
              Reset
            </Button>
          </div>

          {/* Result */}
          {calculatedPoints !== null && (
            <div className="border-t pt-4">
              <div className="text-center">
                <div className="text-sm text-default-500 mb-1">
                  Total Points
                </div>
                <Chip color="primary" size="lg" variant="flat">
                  <span className="text-xl font-bold">{calculatedPoints}</span>
                </Chip>
              </div>
            </div>
          )}

          {/* Points Table Reference */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-2">Points Reference</h4>
            <div className="grid grid-cols-5 gap-1 text-xs">
              {pointsSystem.positions.slice(0, 10).map((pos) => (
                <div
                  key={pos.position}
                  className="text-center p-1 bg-default-100 rounded"
                >
                  <div className="font-bold">P{pos.position}</div>
                  <div className="text-primary">{pos.points}pt</div>
                </div>
              ))}
            </div>
            {pointsSystem.positions.length > 10 && (
              <p className="text-xs text-default-500 mt-2 text-center">
                + {pointsSystem.positions.length - 10} more positions with
                points
              </p>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
