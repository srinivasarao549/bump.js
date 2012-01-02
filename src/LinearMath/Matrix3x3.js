// **Bump.Matrix3x3** is the port of the `btMatrix3x3` class in
// [Bullet](http://bulletphysics.org).

(function( window, Bump ) {
  var EPSILON = Math.pow( 2, -52 );

  Bump.Matrix3x3 = Bump.type({
    // Given *exactly* nine arguments in row major order,
    // initializes a 3x3 matrix.
    init: function Matrix3x3( xx, xy, xz, yx, yy, yz, zx, zy, zz ) {
      this.m_el0 = Bump.Vector3.create( xx, xy, xz );
      this.m_el1 = Bump.Vector3.create( yx, yy, yz );
      this.m_el2 = Bump.Vector3.create( zx, zy, zz );

      this.m_el = [
        Bump.Vector3.create( xx, xy, xz ),
        Bump.Vector3.create( yx, yy, yz ),
        Bump.Vector3.create( zx, zy, zz )
      ];

      this.setValue( xx, xy, xz,
                     yx, yy, yz,
                     zx, zy, zz );
    },

    // ## Properties
    properties: {
      // The properties for 0, 1, and 2 are used to emulate `btMatrix3x3`'s
      // `operator[]` overload. This is purely for maintaining the interface, as
      // they are much slower. It is faster to access the properties directly on
      // the object.
      0: {
        get: function() { return this.m_el0; },
        set: function( v ) { v.clone( this.m_el0 ); }
      },

      1: {
        get: function() { return this.m_el1; },
        set: function( v ) { v.clone( this.m_el1 ); }
      },

      2: {
        get: function() { return this.m_el2; },
        set: function( v ) { v.clone( this.m_el2 ); }
      }
    },

    // ## Member functions
    members: {
      // ### Basic utilities

      // Clones `this` matrix into `dest`.
      clone: function( dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x, this.m_el0.y, this.m_el0.z,
          this.m_el1.x, this.m_el1.y, this.m_el1.z,
          this.m_el2.x, this.m_el2.y, this.m_el2.z
        );
      },

      // Compares `this` to `that` and returns whether they are the same.
      equal: function( that ) {
        return (
          this.m_el0.x === that.m_el0.x && this.m_el0.y === that.m_el0.y && this.m_el0.z === that.m_el0.z &&
          this.m_el1.x === that.m_el1.x && this.m_el1.y === that.m_el1.y && this.m_el1.z === that.m_el1.z &&
          this.m_el2.x === that.m_el2.x && this.m_el2.y === that.m_el2.y && this.m_el2.z === that.m_el2.z
        );
      },

      // Puts the `i`th column into the given [`Bump.Vector3`](vector3.html)
      // `dest`.
      getColumn: function( i, dest ) {
        dest = dest || Bump.Vector3.create();
        dest.x = this.m_el0[i];
        dest.y = this.m_el1[i];
        dest.z = this.m_el2[i];
        return dest;
      },

      // Puts the `i`th row into the given [`Bump.Vector3`](vector3.html)
      // `dest`.
      getRow: function( i, dest ) {
        dest = dest || Bump.Vector3.create();
        return this[i].clone( dest );
      },

      // Given *exactly* nine arguments in row major order, sets the values of
      // `this` matrix.
      setValue: function( xx, xy, xz, yx, yy, yz, zx, zy, zz ) {
        this.m_el0.setValue( xx, xy, xz );
        this.m_el1.setValue( yx, yy, yz );
        this.m_el2.setValue( zx, zy, zz );

        this.m_el[0].setValue( xx, xy, xz );
        this.m_el[1].setValue( yx, yy, yz );
        this.m_el[2].setValue( zx, zy, zz );

        this.m11 = xx; this.m12 = xy; this.m13 = xz;
        this.m21 = yx; this.m22 = yy; this.m23 = yz;
        this.m31 = zx; this.m32 = zy; this.m33 = zz;

        this.m = [ xx, xy, xz, yx, yy, yz, zx, zy, zz ];

        return this;
      },

      // Set `this` matrix to the identity matrix.
      setIdentity: function() {
        return this.setValue( 1, 0, 0,
                              0, 1, 0,
                              0, 0, 1 );
      },

      // Set `this` matrix to be a rotation matrix from `quat` quaternion.
      setRotation: function( quat ) {
        var d = quat.length2();
        // `btFullAssert( d !== 0 );`
        var s = 2 / d,
            xs = quat.x * s,  ys = quat.y * s,  zs = quat.z * s,
            wx = quat.w * xs, wy = quat.w * ys, wz = quat.w * zs,
            xx = quat.x * xs, xy = quat.x * ys, xz = quat.x * zs,
            yy = quat.y * ys, yz = quat.y * zs, zz = quat.z * zs;

        return this.setValue(
          1 - ( yy + zz ), xy - wz, xz + wy,
          xy + wz, 1.0 - (xx + zz), yz - wx,
          xz - wy, yz + wx, 1 - ( xx + yy )
        );
      },

      // Set `this` matrix to be a rotation matrix calculated from the given
      // yaw, pitch, and roll.
      setEulerYPR: function( yaw, pitch, roll ) {
        return this.setEulerZYX( roll, pitch, yaw );
      },

      // Set `this` matrix to be a rotation matrix calculated from the given
      // Euler angles. The Euler angles are applied in ZYX order.
      setEulerZYX: function( eulerX, eulerY, eulerZ ) {
        var ci = Math.cos( eulerX ),
            cj = Math.cos( eulerY ),
            ch = Math.cos( eulerZ ),
            si = Math.sin( eulerX ),
            sj = Math.sin( eulerY ),
            sh = Math.sin( eulerZ ),
            cc = ci * ch,
            cs = ci * sh,
            sc = si * ch,
            ss = si * sh;

        return this.setValue(
          cj * ch, sj * sc - cs, sj * cc + ss,
          cj * sh, sj * ss + cc, sj * cs - sc,
          -sj,     cj * si,      cj * ci
        );
      },

      getRotation: function( dest ) {
        dest = dest || Bump.Quaternion.create();

        var trace = this.m_el0.x + this.m_el1.y + this.m_el2.z,
            temp = new Array(4),
            s;

        if ( trace > 0 ) {
          s = Math.sqrt( trace + 1 );
          temp[3] = ( s * 0.5 );
          s = 0.5 / s;

          temp[0] = ( ( this.m_el2.y - this.m_el1.z ) * s );
          temp[1] = ( ( this.m_el0.z - this.m_el2.x ) * s );
          temp[2] = ( ( this.m_el1.x - this.m_el0.y ) * s );
        } else {
          var i = this.m_el0.x < this.m_el1.y ?
                ( this.m_el1.y < this.m_el2.z ? 2 : 1 ) :
                ( this.m_el0.x < this.m_el2.z ? 2 : 0 ),
              j = ( i + 1 ) % 3,
              k = ( i + 2 ) % 3;

          s = Math.sqrt( this[i][i] - this[j][j] - this[k][k] + 1 );
          temp[i] = s * 0.5;
          s = 0.5 / s;

          temp[3] = ( this[k][j] - this[j][k] ) * s;
          temp[j] = ( this[j][i] + this[i][j] ) * s;
          temp[k] = ( this[k][i] + this[i][k] ) * s;
        }

        return dest.setValue(
          temp[0], temp[1], temp[2], temp[3]
        );
      },

      // Get `this` matrix represented as euler angles around YXZ.
      getEulerYPR: function( dest ) {
        dest = dest || {};

        dest.yaw   = Math.atan2( this.m_el1.x, this.m_el0.x );
        dest.pitch = Math.asin( -this.m_el2.x );
        dest.roll  = Math.atan2( this.m_el2.y, this.m_el2.z );

        if ( Math.abs( dest.pitch ) === Math.PI / 2 ) {
          if ( dest.yaw > 0 ) {
            dest.yaw -= Math.PI;
          } else {
            dest.yaw += Math.PI;
          }

          if ( dest.roll > 0 ) {
            dest.roll -= Math.PI;
          } else {
            dest.roll += Math.PI;
          }
        }

        return dest;
      },

      // Get `this` matrix represented as euler angles around ZYX.
      getEulerZYX: function( dest, solutionNumber ) {
        dest = dest || {};
        solutionNumber = solutionNumber === undefined ? 1 : solutionNumber;

        var eulerOut1, eulerOut2;

        if ( solutionNumber === 1 ) {
          eulerOut1 = dest;
          eulerOut2 = {};
        } else {
          eulerOut2 = dest;
          eulerOut1 = {};
        }

        // check that pitch is not at a singularity
        if ( Math.abs( this.m_el2.x ) >= 1) {
          eulerOut1.yaw = 0;
          eulerOut2.yaw = 0;

          // from difference of angles formula
          var delta = Math.atan2( this.m_el0.x, this.m_el0.z );

          //gimbal locked up
          if ( this.m_el2.x  > 0 ) {
            eulerOut1.pitch = Math.PI / 2;
            eulerOut2.pitch = Math.PI / 2;
            eulerOut1.roll = eulerOut1.pitch + delta;
            eulerOut2.roll = eulerOut1.pitch + delta;
          }

          // gimbal locked down
          else {
            eulerOut1.pitch = -Math.PI / 2;
            eulerOut2.pitch = -Math.PI / 2;
            eulerOut1.roll = -eulerOut1.pitch + delta;
            eulerOut2.roll = -eulerOut1.pitch + delta;
          }
        }

        else {
          eulerOut1.pitch = - Math.asin( this.m_el2.x );
          eulerOut2.pitch = Math.PI - eulerOut1.pitch;

          var cp1 = Math.cos( eulerOut1.pitch ),
              cp2 = Math.cos( eulerOut2.pitch );

          eulerOut1.roll = Math.atan2( this.m_el2.y / cp1, this.m_el2.z / cp1);
          eulerOut2.roll = Math.atan2( this.m_el2.y / cp2, this.m_el2.z / cp2);

          eulerOut1.yaw = Math.atan2( this.m_el1.x / cp1, this.m_el0.x / cp1);
          eulerOut2.yaw = Math.atan2( this.m_el1.x / cp2, this.m_el0.x / cp2);
        }

        return dest;
      },

      // ### Math functions

      // Add matrices into `dest`.
      add: function( m, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x + m.m_el0.x, this.m_el0.y + m.m_el0.y, this.m_el0.z + m.m_el0.z,
          this.m_el1.x + m.m_el1.x, this.m_el1.y + m.m_el1.y, this.m_el1.z + m.m_el1.z,
          this.m_el2.x + m.m_el2.x, this.m_el2.y + m.m_el2.y, this.m_el2.z + m.m_el2.z
        );
      },

      // Add matrix `m` to `this`.
      addSelf: function( m ) {
        return this.setValue(
          this.m_el0.x + m.m_el0.x, this.m_el0.y + m.m_el0.y, this.m_el0.z + m.m_el0.z,
          this.m_el1.x + m.m_el1.x, this.m_el1.y + m.m_el1.y, this.m_el1.z + m.m_el1.z,
          this.m_el2.x + m.m_el2.x, this.m_el2.y + m.m_el2.y, this.m_el2.z + m.m_el2.z
        );
      },

      // Subtract matrices into `dest`.
      subtract: function( m, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x - m.m_el0.x, this.m_el0.y - m.m_el0.y, this.m_el0.z - m.m_el0.z,
          this.m_el1.x - m.m_el1.x, this.m_el1.y - m.m_el1.y, this.m_el1.z - m.m_el1.z,
          this.m_el2.x - m.m_el2.x, this.m_el2.y - m.m_el2.y, this.m_el2.z - m.m_el2.z
        );
      },

      // Subtract matrix from `this`.
      subtractSelf: function( m ) {
        return this.setValue(
          this.m_el0.x - m.m_el0.x, this.m_el0.y - m.m_el0.y, this.m_el0.z - m.m_el0.z,
          this.m_el1.x - m.m_el1.x, this.m_el1.y - m.m_el1.y, this.m_el1.z - m.m_el1.z,
          this.m_el2.x - m.m_el2.x, this.m_el2.y - m.m_el2.y, this.m_el2.z - m.m_el2.z
        );
      },

      // Multiplies the given matrices and stores it in `dest` matrix.
      multiplyMatrix: function( m, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          m.tdotx( this.m_el0 ), m.tdoty( this.m_el0 ), m.tdotz( this.m_el0 ),
          m.tdotx( this.m_el1 ), m.tdoty( this.m_el1 ), m.tdotz( this.m_el1 ),
          m.tdotx( this.m_el2 ), m.tdoty( this.m_el2 ), m.tdotz( this.m_el2 )
        );
      },

      // Multiplies `this` matrix and the given matrix and stores it in
      // `dest` matrix.
      multiplyMatrixSelf: function( m ) {
        return this.setValue(
          m.tdotx( this.m_el0 ), m.tdoty( this.m_el0 ), m.tdotz( this.m_el0 ),
          m.tdotx( this.m_el1 ), m.tdoty( this.m_el1 ), m.tdotz( this.m_el1 ),
          m.tdotx( this.m_el2 ), m.tdoty( this.m_el2 ), m.tdotz( this.m_el2 )
        );
      },

      // Multiplies `this` matrix with vector `v` and stores it in `dest`.
      //
      //     ┌             ┐   ┌    ┐
      //     │ t11 t12 t13 │ * │ vx │
      //     │ t21 t22 t23 │   │ vy │
      //     │ t31 t32 t33 │   │ vz │
      //     └             ┘   └    ┘
      //
      multiplyVector: function( v, dest ) {
        dest = dest || Bump.Vector3.create();
        return dest.setValue(
          this.m_el0.dot( v ),
          this.m_el1.dot( v ),
          this.m_el2.dot( v )
        );
      },

      // Transposes `v` and multiplies it with `this` matrix and stores it in
      // `dest`.
      //
      //     ┌          ┐   ┌             ┐
      //     │ vx vy vz │ * │ t11 t12 t13 │
      //     └          ┘   │ t21 t22 t23 │
      //                    │ t31 t32 t33 │
      //                    └             ┘
      //
      vectorMultiply: function( v, dest ) {
        dest = dest || Bump.Vector3.create();
        return dest.setValue(
          this.tdotx( v ), this.tdoty( v ), this.tdotz( v )
        );
      },

      // Multiplies each element of `this` matrix and stores it in `dest`.
      multiplyScalar: function( k, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x * k, this.m_el0.y * k, this.m_el0.z * k,
          this.m_el1.x * k, this.m_el1.y * k, this.m_el1.z * k,
          this.m_el2.x * k, this.m_el2.y * k, this.m_el2.z * k
        );
      },

      // Get a scaled version of `this` matrix. The components of `s` are
      // multiplied through the respective columns.
      scaled: function( s, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x * s.x, this.m_el0.y * s.y, this.m_el0.z * s.z,
          this.m_el1.x * s.x, this.m_el1.y * s.y, this.m_el1.z * s.z,
          this.m_el2.x * s.x, this.m_el2.y * s.y, this.m_el2.z * s.z
        );
      },

      // Multiplies the transpose of `this` matrix with `m` and stores it in
      // `dest`.
      //
      //     ┌             ┐   ┌             ┐
      //     │ t11 t21 t31 │ * │ m11 m12 m13 │
      //     │ t12 t22 t32 │   │ m21 m22 m23 │
      //     │ t13 t23 t33 │   │ m31 m32 m33 │
      //     └             ┘   └             ┘
      //
      transposeTimes: function( m, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x * m.m_el0.x + this.m_el1.x * m.m_el1.x + this.m_el2.x * m.m_el2.x,
          this.m_el0.x * m.m_el0.y + this.m_el1.x * m.m_el1.y + this.m_el2.x * m.m_el2.y,
          this.m_el0.x * m.m_el0.z + this.m_el1.x * m.m_el1.z + this.m_el2.x * m.m_el2.z,
          this.m_el0.y * m.m_el0.x + this.m_el1.y * m.m_el1.x + this.m_el2.y * m.m_el2.x,
          this.m_el0.y * m.m_el0.y + this.m_el1.y * m.m_el1.y + this.m_el2.y * m.m_el2.y,
          this.m_el0.y * m.m_el0.z + this.m_el1.y * m.m_el1.z + this.m_el2.y * m.m_el2.z,
          this.m_el0.z * m.m_el0.x + this.m_el1.z * m.m_el1.x + this.m_el2.z * m.m_el2.x,
          this.m_el0.z * m.m_el0.y + this.m_el1.z * m.m_el1.y + this.m_el2.z * m.m_el2.y,
          this.m_el0.z * m.m_el0.z + this.m_el1.z * m.m_el1.z + this.m_el2.z * m.m_el2.z
        );
      },

      // Multiplies `this` matrix with the transpose of `m` and stores it in
      // `dest`.
      //
      //     ┌             ┐   ┌             ┐
      //     │ t11 t12 t13 │ * │ m11 m21 m31 │
      //     │ t21 t22 t23 │   │ m12 m22 m32 │
      //     │ t31 t32 t33 │   │ m13 m23 m33 │
      //     └             ┘   └             ┘
      //
      timesTranspose: function( m, dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.dot( m.m_el0 ), this.m_el0.dot( m.m_el1 ), this.m_el0.dot( m.m_el2 ),
          this.m_el1.dot( m.m_el0 ), this.m_el1.dot( m.m_el1 ), this.m_el1.dot( m.m_el2 ),
          this.m_el2.dot( m.m_el0 ), this.m_el2.dot( m.m_el1 ), this.m_el2.dot( m.m_el2 )
        );
      },

      // ## Advanced utilities and transformations

      // Get the [determinant](http://en.wikipedia.org/wiki/Determinant) of
      // `this` matrix.
      determinant: function() {
        return this.m_el0.triple( this.m_el1, this.m_el2 );
      },

      // Computes the [adjugate matrix](http://en.wikipedia.org/wiki/Adjugate_matrix)
      // of `this` matrix.
      adjoint: function( dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.cofac( 1, 1, 2, 2 ), this.cofac( 0, 2, 2, 1 ), this.cofac( 0, 1, 1, 2 ),
          this.cofac( 1, 2, 2, 0 ), this.cofac( 0, 0, 2, 2 ), this.cofac( 0, 2, 1, 0 ),
          this.cofac( 1, 0, 2, 1 ), this.cofac( 0, 1, 2, 0) , this.cofac( 0, 0, 1, 1 )
        );
      },

      // Computes a matrix composed of the absolute value of the elements of
      // `this` matrix.
      absolute: function( dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          Math.abs( this.m_el0.x ), Math.abs( this.m_el0.y ), Math.abs( this.m_el0.z ),
          Math.abs( this.m_el1.x ), Math.abs( this.m_el1.y ), Math.abs( this.m_el1.z ),
          Math.abs( this.m_el2.x ), Math.abs( this.m_el2.y ), Math.abs( this.m_el2.z )
        );
      },

      // Computes the [transpose](http://en.wikipedia.org/wiki/Transpose) of
      // `this` matrix.
      transpose: function( dest ) {
        dest = dest || Bump.Matrix3x3.create();
        return dest.setValue(
          this.m_el0.x, this.m_el1.x, this.m_el2.x,
          this.m_el0.y, this.m_el1.y, this.m_el2.y,
          this.m_el0.z, this.m_el1.z, this.m_el2.z
        );
      },

      // Computes the [inverse](http://en.wikipedia.org/wiki/Invertible_matrix),
      // of `this` matrix, if it exists.
      inverse: function( dest ) {
        dest = dest || Bump.Matrix3x3.create();

        var co = Bump.Vector3.create(
              this.cofac( 1, 1, 2, 2 ),
              this.cofac( 1, 2, 2, 0 ),
              this.cofac( 1, 0, 2, 1 )
            ),
            det = this.m_el0.dot( co );

        // btFullAssert( det !== 0);
        var s = 1 / det;
        return dest.setValue(
          co.x * s, this.cofac( 0, 2, 2, 1 ) * s, this.cofac( 0, 1, 1, 2 ) * s,
          co.y * s, this.cofac( 0, 0, 2, 2 ) * s, this.cofac( 0, 2, 1, 0 ) * s,
          co.z * s, this.cofac( 0, 1, 2, 0 ) * s, this.cofac( 0, 0, 1, 1 ) * s
        );
      },

      // "Diagonalizes" `this` matrix using the Jacobi method.
      //
      // `rot` argument then stores the rotation from the coordinate system in
      // which the matrix is diagonal to the original coordinate system, i.e.,
      //
      //     `old_this = rot * new_this * rot^T;`
      //
      // `threshold` and `maxSteps` determine how many iterations are run. It
      // stops when all off-diagonal elements are less than `threshold`
      // multiplied by the sum of the absolute values of the diagonal, or
      // `maxSteps` iterations have been performed.
      //
      // **Note:** `this` matrix is assumed to be symmetric.
      diagonalize: function( rot, threshold, maxSteps ) {
        rot = rot || Bump.Matrix3x3.getIdentity();

        var step;
        for ( step = maxSteps; step > 0; --step ) {
          // Find off-diagonal element `[p][q]` with largest magnitude
          var p = 0, q = 1, r = 2,

              max = Math.abs( this.m_el0.y ),
              v   = Math.abs( this.m_el0.z );

          if ( v > max ) {
            q = 2;
            r = 1;
            max = v;
          }
          v = Math.abs( this.m_el1.z );
          if ( v > max ) {
            p = 1;
            q = 2;
            r = 0;
            max = v;
          }

          var t = threshold * ( Math.abs( this.m_el0.x ) + Math.abs( this.m_el1.y ) + Math.abs( this.m_el2.z ) );

          if ( max <= t ) {
            if ( max <= EPSILON * t ) {
              return this;
            }
            step = 1;
          }

          // Compute Jacobi rotation J which leads to a zero for element
          // `[p][q]`
          var mpq = this[p][q],
              theta = ( this[q][q] - this[p][p] ) / ( 2 * mpq ),
              theta2 = theta * theta,
              cos,
              sin;

          if ( theta2 * theta2 < ( 10 / EPSILON ) ) {
            t = ( theta >= 0 ) ?
              1 / ( theta + Math.sqrt( 1 + theta2 ) ) :
              1 / ( theta - Math.sqrt( 1 + theta2 ) );

            cos = 1 / Math.sqrt( 1 + t * t );
            sin = cos * t;
          } else {
            // Approximation for large theta-value, i.e., a nearly
            // diagonal matrix
            t = 1 / ( theta * ( 2 + 0.5 / theta2 ) );
            cos = 1 - 0.5 * t * t;
            sin = cos * t;
          }

          // Apply rotation to matrix (`this = J^T * this * J`)
          this[p][q]  = this[q][p] = 0;
          this[p][p] -= t * mpq;
          this[q][q] += t * mpq;

          var mrp = this[r][p],
              mrq = this[r][q];

          this[r][p] = this[p][r] = cos * mrp - sin * mrq;
          this[r][q] = this[q][r] = cos * mrq + sin * mrp;

          // Apply rotation to `rot` (`rot = rot * J`)
          var i, row;
          for ( i = 0; i < 3; ++i ) {
            row = rot[i];
            mrp = row[p];
            mrq = row[q];
            row[p] = cos * mrp - sin * mrq;
            row[q] = cos * mrq + sin * mrp;
          }
        }

        return this;
      },

      // Returns the dot product of the first column and the given vector.
      tdotx: function( v ) {
        return this.m_el0.x * v.x + this.m_el1.x * v.y + this.m_el2.x * v.z;
      },

      // Returns the dot product of the first column and the given vector.
      tdoty: function( v ) {
        return this.m_el0.y * v.x + this.m_el1.y * v.y + this.m_el2.y * v.z;
      },

      // Returns the dot product of the first column and the given vector.
      tdotz: function( v ) {
        return this.m_el0.z * v.x + this.m_el1.z * v.y + this.m_el2.z * v.z;
      },

      // Compute the matrix cofactor
      cofac: function( r1, c1, r2, c2 ) {
        return this[r1][c1] * this[r2][c2] - this[r1][c2] * this[r2][c1];
      },

      // ## Non-public, internal methods
      // **Warning:** May cause undesired side-effects when used. Probably don't
      // need to be concerned with these functions.

      // Internal method for alternate initialization using three
      // [`Bump.Vector3`](vector3.html)s
      _initWithVectors: function( vecA, vecB, vecC ) {
        this.m_el0 = Bump.Vector3.clone( vecA );
        this.m_el1 = Bump.Vector3.clone( vecB );
        this.m_el2 = Bump.Vector3.clone( vecC );

        this.m_el = [
          Bump.Vector3.clone( vecA ),
          Bump.Vector3.clone( vecB ),
          Bump.Vector3.clone( vecC )
        ];

        this.setValue( vecA.x, vecA.y, vecA.z,
                       vecB.x, vecB.y, vecB.z,
                       vecC.x, vecC.y, vecC.z );
      }
    },

    // ## Static functions
    typeMembers: {
      // Given *up to* nine arguments in row major order, **creates** a new 3x3
      // matrix.
      create: function( xx, xy, xz, yx, yy, yz, zx, zy, zz ) {
        var mat = Object.create( Bump.Matrix3x3.prototype );
        mat.init( xx || 0, xy || 0, xz || 0,
                  yx || 0, yy || 0, yz || 0,
                  zx || 0, zy || 0, zz || 0 );
        return mat;
      },

      createFromQuaternion: function( quat ) {
        var mat = Object.create( Bump.Matrix3x3.prototype );
        mat.init( 0, 0, 0, 0, 0, 0, 0, 0, 0 );
        mat.setRotation( quat );
        return mat;
      },

      // **Creates** a 3x3 identity matrix. **Note:** this does not return a
      // `const` static reference like in C++.
      getIdentity: function() {
        var mat = Object.create( Bump.Matrix3x3.prototype );
        mat.init( 1, 0, 0,
                  0, 1, 0,
                  0, 0, 1 );
        return mat;
      },

      // **Creates** a new matrix and copies a matrix to it.
      clone: function( mat ) {
        var newMat = Object.create( Bump.Matrix3x3.prototype );
        newMat._initWithVectors( mat.m_el0, mat.m_el1, mat.m_el2 );
        return newMat;
      }
    }
  });
})( this, this.Bump );
