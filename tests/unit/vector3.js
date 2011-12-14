module( 'Bump.Vector3' );

test( 'Bump.Vector3 exists', 1, function() {
  ok( Bump.Vector3, 'Bump.Vector3 exists' );
} );

test( 'functions exist', 35, function() {
  ok( Bump.Vector3.create, 'create exists' );
  ok( Bump.Vector3.add, 'add exists' );
  ok( Bump.Vector3.subtract, 'subtract exists' );
  ok( Bump.Vector3.multiply, 'multiply exists' );
  ok( Bump.Vector3.scale, 'scale exists' );
  ok( Bump.Vector3.divide, 'divide exists' );
  ok( Bump.Vector3.divideElements, 'divideElements exists' );
  ok( Bump.Vector3.dot, 'dot exists' );
  ok( Bump.Vector3.length2, 'length2 exists' );
  ok( Bump.Vector3.length, 'length exists' );
  ok( Bump.Vector3.distance2, 'distance2 exists' );
  ok( Bump.Vector3.distance, 'distance exists' );
  ok( Bump.Vector3.safeNormalize, 'safeNormalize exists' );
  ok( Bump.Vector3.normalize, 'normalize exists' );
  ok( Bump.Vector3.normalized, 'normalized exists' );
  ok( Bump.Vector3.rotate, 'rotate exists' );
  ok( Bump.Vector3.angle, 'angle exists' );
  ok( Bump.Vector3.absolute, 'absolute exists' );
  ok( Bump.Vector3.cross, 'cross exists' );
  ok( Bump.Vector3.triple, 'triple exists' );
  ok( Bump.Vector3.minAxis, 'minAxis exists' );
  ok( Bump.Vector3.maxAxis, 'maxAxis exists' );
  ok( Bump.Vector3.furthestAxis, 'furthestAxis exists' );
  ok( Bump.Vector3.closestAxis, 'closestAxis exists' );
  ok( Bump.Vector3.setInterpolate3, 'setInterpolate3 exists' );
  ok( Bump.Vector3.lerp, 'lerp exists' );
  ok( Bump.Vector3.equal, 'equal exists' );
  ok( Bump.Vector3.notEqual, 'notEqual exists' );
  ok( Bump.Vector3.setMax, 'setMax exists' );
  ok( Bump.Vector3.setMin, 'setMin exists' );
  ok( Bump.Vector3.setValue, 'setValue exists' );
  ok( Bump.Vector3.getSkewSymmetricMatrix, 'getSkewSymmetricMatrix exists' );
  ok( Bump.Vector3.setZero, 'setZero exists' );
  ok( Bump.Vector3.isZero, 'isZero exists' );
  ok( Bump.Vector3.fuzzyZero, 'fuzzyZero exists' );
} );

module( 'Bump.Vector3.create' );

test( 'create produces arrays', 2, function() {
  deepEqual( Bump.Vector3.create(), [ 0, 0, 0, 0 ] );
  deepEqual( Bump.Vector3.create(1, 2, 3), [ 1, 2, 3, 0 ] );
} );

module( 'Bump.Vector3 math functions' );

test( 'add function', 5, function() {
  var v1 = Bump.Vector3.create(1, 2, 3),
  v2 = Bump.Vector3.create(1, -2, 0),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.add( v1, v2, v3 );
  equal( ret, v3, 'with destination : return value references destination' );
  deepEqual(v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual(v3, Bump.Vector3.create( 2, 0, 3 ), 'with destination : correct result');

  ret = Bump.Vector3.add(v1, v2);
  equal( ret, v1, 'in place : return value references original');
  deepEqual(v1, Bump.Vector3.create( 2, 0, 3 ), 'in place : correct result');
} );

test( 'subtract function', 5, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create( 1, -2, 0 ),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.subtract( v1, v2, v3 );
  equal( ret, v3, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual( v3, Bump.Vector3.create( 0, 4, 3 ), 'with destination : correct result');

  ret = Bump.Vector3.subtract( v1, v2 );
  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 0, 4, 3 ), 'in place : correct result');
} );

test( 'multiply function', 5, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.multiply( v1, 2, v2 );
  equal( ret, v2, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual( v2,  Bump.Vector3.create( 2, 4, 6 ), 'with destination : correct result' );

  ret = Bump.Vector3.multiply( v1, 2 );
  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 2, 4, 6 ), 'in place: correct result' );
} );

test( 'scale function', 5, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create( 2, -1, 0 ),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.scale( v1, v2, v3 );
  equal( ret, v3, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual( v3,  Bump.Vector3.create( 2, -2, 0 ), 'with destination : correct result' );

  ret = Bump.Vector3.scale( v1, v2 );
  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 2, -2, 0 ), 'in place: correct result' );
} );


test( 'divide function', 5, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.divide( v1, 2, v2 );
  equal( ret, v2, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual( v2,  Bump.Vector3.create( 0.5, 1, 1.5 ), 'with destination : correct result' );

  ret = Bump.Vector3.divide( v1, 2 );
  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 0.5, 1, 1.5 ), 'in place : correct result');
} );

test( 'divideElements function', 5, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 ),
  v2 = Bump.Vector3.create(2, 1, -3),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.divideElements( v1, v2, v3 );
  equal( ret, v3, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'with destination : original unchanged' );
  deepEqual( v3,  Bump.Vector3.create( 0.5, 2, -1 ), 'with destination : correct result' );

  ret = Bump.Vector3.divideElements( v1, v2 );
  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 0.5, 2, -1 ), 'in place : correct result');
} );

test( 'dot function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 1, 1 ),
  v2 = Bump.Vector3.create( 2, 2, 2 );
  equal( Bump.Vector3.dot( v1, v2 ), 6 );
} );

test( 'length2 function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length2( v1 ), 14 );
} );

test( 'length function', 1, function() {
  var v1 = Bump.Vector3.create( 1, 2, 3 );
  equal( Bump.Vector3.length( v1 ), Math.sqrt( 14 ) );
} );

test( 'distance2 function', 1, function() {
  var v1 = Bump.Vector3.create( 2, 2, 2 ),
  v2 = Bump.Vector3.create( -1, -1, -1 );
  equal( Bump.Vector3.distance2( v1, v2 ), 27 );
} );

test( 'distance function', 1, function() {
  var v1 = Bump.Vector3.create( 2, 2, 2 ),
  v2 = Bump.Vector3.create( -1, -1, -1 );
  equal( Bump.Vector3.distance( v1, v2 ), Math.sqrt( 27 ) );
} );

test( 'safeNormalize', 3, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 ),
  v3 = Bump.Vector3.create();

  deepEqual( Bump.Vector3.safeNormalize( v1 ), Bump.Vector3.create( 1, 0, 0 ) );
  deepEqual( Bump.Vector3.safeNormalize( v2 ), Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) ) );
  deepEqual( Bump.Vector3.safeNormalize( v3 ), Bump.Vector3.create( 1, 0, 0 ) );
} );

test( 'normalize', 4, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 ),
  ret;

  ret = Bump.Vector3.normalize( v1 );

  equal( ret, v1, 'return value references original vector correctly' );
  deepEqual( v1, Bump.Vector3.create( 1, 0, 0 ), 'correct result' );

  ret = Bump.Vector3.normalize( v2 );

  equal( ret, v2, 'return value references original vector correctly' );
  deepEqual( v2, Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) ), 'correct result' );
} );

test( 'normalized', 6, function() {
  var v1 = Bump.Vector3.create( 2, 0, 0 ),
  v2 = Bump.Vector3.create( 0, 1, -1 ),
  v3 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.normalized( v1, v3 );

  equal( ret, v3, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 2, 0, 0 ), 'with destination : original unchanged' );
  deepEqual( v3, Bump.Vector3.create( 1, 0, 0 ), 'with destination : correct result' );

  v4 = Bump.Vector3.normalized( v2 );

  notEqual( v2, v4, 'without destination : return value references newly created vector3' );
  deepEqual( v2, Bump.Vector3.create( 0, 1, -1 ), 'without destination : original unchanged' );
  deepEqual( v4, Bump.Vector3.create( 0, 1/Math.sqrt( 2 ), -1/Math.sqrt( 2 ) ),
             'without destination : correct result' );
} );

// definitely should add more tests for this one
test( 'rotate', 9, function() {
  var v1 = Bump.Vector3.create( 1, 0, 0 ),
  zAxis = Bump.Vector3.create( 0, 0, 1 ),
  vRot = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.rotate( v1, zAxis, Math.PI/2, vRot );

  equal( ret, vRot, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( 1, 0, 0 ), 'with destination : original unchanged' );
  ok( Math.abs( vRot[0] ) < Bump.SIMD_EPSILON, 'with destination : correct result : x is close to 0' );
  ok( Math.abs( vRot[1] - 1 ) < Bump.SIMD_EPSILON, 'with destination : correct result : y is close to 1' );
  ok( Math.abs( vRot[0] ) < Bump.SIMD_EPSILON, 'with destination : correct result: z is close to 0' );

  ret = Bump.Vector3.rotate( v1, zAxis, Math.PI );

  equal( ret, v1, 'in place : return value references original' );
  ok( Math.abs( v1[0] + 1 ) < Bump.SIMD_EPSILON, 'in place : correct result : x is close to -1' );
  ok( Math.abs( v1[1] ) < Bump.SIMD_EPSILON, 'in place : correct result : y is close to 0' );
  ok( Math.abs( v1[2] ) < Bump.SIMD_EPSILON, 'in place : correct result : z is close to 0' );
} );

test( 'angle', 12, function() {
  var right = Bump.Vector3.create( 1, 0, 0 ),
  up = Bump.Vector3.create( 0, 1, 0 ),
  left = Bump.Vector3.create( -1, 0, 0 ),
  forward = Bump.Vector3.create( 0, 0, 1 ),
  upRight = Bump.Vector3.create( 1, 1, 0 );

  ok( Math.abs( Bump.Vector3.angle( right, up ) - Math.PI / 2 ) < Bump.SIMD_EPSILON,
    'angle( right, up ) is close to pi/2' );
  ok( Math.abs( Bump.Vector3.angle( right, forward ) - Math.PI / 2 ) < Bump.SIMD_EPSILON,
    'angle( right, forward ) is close to pi/2' );
  ok( Math.abs( Bump.Vector3.angle( right, left ) - Math.PI ) < Bump.SIMD_EPSILON,
    'angle( right, left ) is close to pi' );
  ok( Math.abs( Bump.Vector3.angle( right, upRight ) - Math.PI / 4 ) < Bump.SIMD_EPSILON,
    'angle( right, up + right ) is close to pi/4' );
  ok( Math.abs( Bump.Vector3.angle( left, upRight ) - 3 * Math.PI / 4 ) < Bump.SIMD_EPSILON,
    'angle( left, up + right ) is close to 3*pi/4' );
  ok( Math.abs( Bump.Vector3.angle( up, upRight ) - Math.PI / 4 ) < Bump.SIMD_EPSILON,
    'angle( up, up + right ) is close to pi/4' );
  ok( Math.abs( Bump.Vector3.angle( forward, upRight ) - Math.PI / 2 ) < Bump.SIMD_EPSILON,
    'angle( forward, up + right ) is close to pi/2' );

  deepEqual( right, Bump.Vector3.create( 1, 0, 0 ), 'right unchanged' );
  deepEqual( up, Bump.Vector3.create( 0, 1, 0 ), 'up unchanged' );
  deepEqual( left, Bump.Vector3.create( -1, 0, 0 ), 'left unchanged' );
  deepEqual( forward, Bump.Vector3.create( 0, 0, 1 ), 'forward unchanged' );
  deepEqual( upRight, Bump.Vector3.create( 1, 1, 0 ), 'up + right unchanged' );
} );

test( 'absolute', 5, function() {
  var v1 = Bump.Vector3.create( -1, -2, 3 ),
  v2 = Bump.Vector3.create(),
  ret;

  ret = Bump.Vector3.absolute( v1, v2 );

  equal( ret, v2, 'with destination : return value references destination' );
  deepEqual( v1, Bump.Vector3.create( -1, -2, 3 ), 'with destination : original unchanged' );
  deepEqual( v2, Bump.Vector3.create( 1, 2, 3 ), 'with destination : correct result' );

  ret = Bump.Vector3.absolute( v1 );

  equal( ret, v1, 'in place : return value references original' );
  deepEqual( v1, Bump.Vector3.create( 1, 2, 3 ), 'in place: correct result' );
} );